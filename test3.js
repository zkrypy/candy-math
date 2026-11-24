const fs=require('fs'),vm=require('vm');const ctx={console};vm.createContext(ctx);
const src=['logic','words','vi','gen'].map(f=>fs.readFileSync('src/'+f+'.js','utf8').replace(/if \(typeof module[^\n]*\n?/g,'')).join('\n')+'\n;this.out={TPL,grade,exampleResp,SKILLS,ORIG,glossify};';
vm.runInContext(src,ctx);const L=ctx.out;let bad=0,n=0;
for(const [sk,list] of Object.entries(L.TPL)) list.forEach((fn,ti)=>{for(let i=0;i<150;i++){let q;try{q=fn();}catch(e){bad++;console.log('THROW',sk,ti,e.message);return;}
 n++; const ok=L.grade(q,L.exampleResp(q)); const issues=[];
 if(!ok) issues.push('ex fails'); if(!L.SKILLS[q.sk]) issues.push('skill'); if(!q.vi) issues.push('no vi'); if(!/^Like /.test(q.src)) issues.push('no like');
 if(q.k==='mc'&&(q.a<0||q.a>=q.opts.length)) issues.push('mc idx'); if(q.k==='multi'&&(q.a.some(x=>x<0)||!q.a.length)) issues.push('multi a');
 if(q.k==='match'&&q.a.some(x=>x<0)) issues.push('match');
 if((q.k==='mc'||q.k==='multi')&&new Set(q.opts).size!==q.opts.length) issues.push('dup opts');
 if(/NaN|undefined|Infinity/.test(JSON.stringify([q.q,q.opts,q.parts&&q.parts.map(p=>[p.pre,p.post,p.ex]),q.rows,q.why,q.fig]))) issues.push('NaN/undef');
 if(issues.length){bad++;console.log('BAD',sk,ti,issues.join(','),JSON.stringify(q.q).slice(0,100));return;}}});
// rows check for r3q1 swap
const h=L.ORIG.find(q=>q.id==='r3q1'); if(!L.grade(h,[['8'],['132'],['660'],['396']])){bad++;console.log('r3q1 swap rejected')}
console.log('templates',Object.values(L.TPL).reduce((a,b)=>a+b.length,0),'generated',n,'bad',bad);
