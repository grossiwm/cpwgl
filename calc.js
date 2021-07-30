const obtemCoefReta = (par) => {
    return par[1][1]/par[0][0];
}

const obtemCir = (centroX, centroY, raio) => {
    const f1 = algebra.parse(`(x-${centroX})^2 + (y-${centroY})^2 = ${raio**2}`);
    return f1;
} 

const obtemIntercoes = (pontoInicial, pontoFinal, passo) => {

    const eqCirc = obtemCir(5, 5, 5);

    // console.log(`circunferência: ${eqCirc.toString()}`)

    let cont = 0;
    const intercs = [];
    for (i=pontoInicial+passo; i<= pontoFinal; i+=2) {
        let par = [];
        par.push([i,0]);
        par.push([0,i]);
        let eqReta = new algebra.Equation(algebra.parse('y'), algebra.parse(`${obtemCoefReta(par)}*x + ${par[1][1]}`));
        // console.log(`reta ${++cont}: ${eqReta.toString()}`);

        let novaEqYStr = eqCirc.toString().replaceAll('x', "(" + eqReta.solveFor('x').toString() + ")");

        let novaEqY = algebra.parse(novaEqYStr);

        let ys = novaEqY.solveFor('y')

        
        ys.forEach((e)=>{
            let novaEqXStr = eqReta.toString().replaceAll('y', e);
            let resp = algebra.parse(novaEqXStr).solveFor('x');

            intercs.push([resp.valueOf(), e]);
        })
    }
    
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






