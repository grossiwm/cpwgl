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
            let ys = algebra.parse(eqCirco.toString().replaceAll('x', '(' + eqReta.solveFor('x').toString() + ')')).solveFor('y');

            ys.forEach((e)=>{
              let resp = algebra.parse(eqReta.toString().replaceAll('y', e)).solveFor('x');
              inters.push([resp.valueOf(), e.valueOf()]);
            })
             
          }
        })
      }
  }

  for (i=0; i < inters.length; i++) {
    ponto = inters[i];
    ponto[0]=ponto[0]/((limite+limite/12.8)*precisao/2);
    ponto[1]=ponto[1]/((limite+limite/12.8)*precisao/2);
  }
  return inters;

}

const colocaEmOrdem = (points) => {

  // Find min max to get center
  // Sort from top to bottom
  points.sort((a,b)=>a[1] - b[1]);

  // Get center y
  const cy = (points[0][1] + points[points.length -1][1]) / 2;

  // Sort from right to left
  points.sort((a,b)=>b[0] - a[0]);

  // Get center x
  const cx = (points[0][0] + points[points.length -1][0]) / 2;

  // Center point
  const center = {x:cx,y:cy};

  // Pre calculate the angles as it will be slow in the sort
  // As the points are sorted from right to left the first point
  // is the rightmost

  // Starting angle used to reference other angles
  var startAng;
  points.forEach(point => {
      var ang = Math.atan2(point[1] - center.y,point[0] - center.x);
      if(!startAng){ startAng = ang }
      else {
          if(ang < startAng){  // ensure that all points are clockwise of the start point
              ang += Math.PI * 2;
          }
      }
      point.angle = ang; // add the angle to the point
  });

  points.sort((a,b)=> a.angle - b.angle);

  return points.reverse();
}
