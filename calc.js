const obtemCoefReta = (par) => {
    return par[1][1]/par[0][0];
}

const obtemCir = (centroX, centroY, raio) => {
    const f1 = algebra.parse(`(x-${centroX})^2 + (y-${centroY})^2 = ${raio**2}`);
    return f1;
} 

const resolveSistema = (ponto, limite) => {
  const circulo = obtemCir(0, 0, 2);

  let exprStr = circulo.toString();
  exprStr = exprStr.replaceAll('x', `(${ponto[0]})`);
  exprStr = exprStr.replaceAll('y', `(${ponto[1]})`);
  let eq = algebra.parse(`${exprStr} + r`);
  return eq.solveFor('r').valueOf();
}

const obtemPontos = (precisao, limite) => {

  const pontosRetas = [];
  for (linha=0;linha < limite - precisao; linha++) {
      for (coluna=0; coluna < limite - precisao; coluna++) {

        let pontoA = [coluna*precisao - limite/2, linha*precisao - limite/2];
        let pontoB = [coluna*precisao + precisao - limite/2, linha*precisao - limite/2];
        let pontoC = [coluna*precisao - limite/2, linha*precisao + precisao - limite/2];
        let pontoD = [coluna*precisao + precisao - limite/2, linha*precisao + precisao - limite/2];

        

        let paresOpostos=[[pontoA, pontoD], [pontoB, pontoC]];

        paresOpostos.forEach((pontos)=>{
          if (resolveSistema(pontos[0], limite)*resolveSistema(pontos[1], limite) < 0) {
            pontosRetas.push(pontos);
          }
        })

      }
  }
  console.log(pontosRetas)
}


obtemPontos(2, 4);




