const obtemCoefReta = (par) => {
    return par[1][1]/par[0][0];
}

const obtemCir = (centroX, centroY, raio) => {
    const f1 = algebra.parse(`(x-${centroX})^2 + (y-${centroY})^2 = ${raio**2}`);
    return f1;
} 

const obtemIntercoes = (pontoInicial, pontoFinal, passo) => {
    const meio = (pontoFinal-pontoInicial)/2;
    const eqCirc = obtemCir(meio, meio, meio);

    let intercs = [];
    for (i=pontoInicial+passo; i<= pontoFinal; i+=passo) {
        let par = [];
        par.push([i,0]);
        par.push([0,i]);
        let eqReta = new algebra.Equation(algebra.parse('y'), algebra.parse(`${obtemCoefReta(par)}*x + ${par[1][1]}`));

        let novaEqYStr = eqCirc.toString().replaceAll('x', "(" + eqReta.solveFor('x').toString() + ")");

        let novaEqY = algebra.parse(novaEqYStr);

        let ys = novaEqY.solveFor('y')

        
        ys.forEach((e)=>{
            let novaEqXStr = eqReta.toString().replaceAll('y', e);
            let resp = algebra.parse(novaEqXStr).solveFor('x');

            intercs.push([resp.valueOf(), e]);
        })
    }
    
    const supesq = [];
    const supdir = [];
    const infesq = [];
    const infdir = [];
    for (i=0; i < intercs.length; i++) {
  
      let ponto = intercs[i];
      let x = ponto[0]-meio;
      let y = ponto[1]-meio;
  
      if (x<0 && y>0) {
        supesq.push(ponto);
      }
  
      if (x>0 && y>0) {
        supdir.push(ponto);
      }
  
      if (x<0 && y<0) {
        infesq.push(ponto);
      }
  
      if (x>0 && y<0) {
        infdir.push(ponto);
      }
  
  
    }
  
    pontos = []
  
    pontos.push(supdir);
    pontos.push(infdir);
    pontos.push(infesq);
    pontos.push(supesq);
  
    pontos.forEach((e) => e.sort((a, b) => a[0] - b[0]));
    console.log(pontos.flat().reverse());
  
    intercs = pontos.flat().reverse().flat();

    return intercs;
}

const xMax=10;
const xMin=0;
const yMax=10;
const yMin=0;

const passo=2;

// console.log('Interseções:');
const intercs = obtemIntercoes(0,10,2);
// console.log(intercs);






