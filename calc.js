const obtemCoefReta = (pari, parf) => {
    return (parf[1] - pari[1])/parseFloat((parf[0] - pari[0]));
}

const obtemB = (par, coefReta) => {
  let eq = new algebra.Equation(algebra.parse('y'), algebra.parse(`${par[1][1].toString()}-${coefReta.toString()}*(${par[1][0].toString()})`))
  return eq.solveFor('y').valueOf();
}

const obtemCir = (centroX, centroY, raio) => {
    const f1 = algebra.parse(`(x-${centroX})^2 + (y-${centroY})^2 = ${raio**2}`);
    return f1;
} 

const resolveSistema = (ponto, limite) => {
  const circulo = obtemCir(0, 0, limite/2.0);

  let exprStr = circulo.toString();
  exprStr = exprStr.replaceAll('x', `(${ponto[0]})`);
  exprStr = exprStr.replaceAll('y', `(${ponto[1]})`);
  let eq = algebra.parse(`${exprStr} + r`);
  return eq.solveFor('r').valueOf();
}

const obtemPontos = (precisao, limite) => {

  const inters = [];
  const eqCirco = obtemCir(0, 0, limite/2.0);

  for (linha=0;linha < limite; linha++) {
      for (coluna=0; coluna < limite; coluna++) {

        let pontoA = [coluna*precisao - limite/2.0, linha*precisao - limite/2.0];
        let pontoB = [coluna*precisao + precisao - limite/2.0, linha*precisao - limite/2.0];
        let pontoC = [coluna*precisao - limite/2.0, linha*precisao + precisao - limite/2.0];
        let pontoD = [coluna*precisao + precisao - limite/2.0, linha*precisao + precisao - limite/2.0];


        let paresOpostos=[[pontoA, pontoD], [pontoB, pontoC]];
        
        paresOpostos.forEach((par)=>{
          if ((resolveSistema(par[0], limite)*resolveSistema(par[1], limite)) < 0) {
            let coefReta = obtemCoefReta(par[0], par[1]);
            let b = obtemB(par, coefReta);
            let eqReta = new algebra.Equation(algebra.parse('y'), algebra.parse(`${coefReta}x + (${b})`));
            console.log(eqReta.toString()); 

            let ys = algebra.parse(eqCirco.toString().replaceAll('x', '(' + eqReta.solveFor('x').toString() + ')')).solveFor('y');

            ys.forEach((e)=>{
              let resp = algebra.parse(eqReta.toString().replaceAll('y', e)).solveFor('x');
              inters.push([resp.valueOf(), e.valueOf()]);
            })
             
          }
        })
      }
  }
  console.log(inters)
  return inters;

}
