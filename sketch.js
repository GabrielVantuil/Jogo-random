//Variaveis que serão usadas por todo o jogo

//função do framework p5js que é executada uma vez ao inicio do sketch
let jogo = [];
let objetos=[];
let pesos = [];
function setup() {
    // jogo = new Jogo();
    for(let i=0; i<150;i++){
        jogo.push(new Jogo());
        //console.log(Math.floor(grift[i].color)+" indice = " + i);
    }
    frameRate(60);
    objetos.push(['r', 0, height*4/5, width, height*1/5, [0,150,0]]);//chao
}

function draw(){
    for(let i=0; i < jogo.length; i++){
        jogo[i].update(objetos);
        jogo[i].draw_game(objetos);
        jogo[i].personagem.comandoIA();
    }



    if(!vivos(jogo)){
        let popu = [];
        for(let i=0; i<jogo.length;i++){
            let cromo = new Cromo(jogo[i].mlp.getWeights(), jogo[i].pontos);

            popu.push(cromo);
        }
        let population = new Population(popu);
       //console.log(popu);
        let fetos = population.generation();
        
        // console.log(fetos);
        for(let i=0; i<jogo.length; i++){
            jogo[i] = new Jogo();
            pesos[i] = fetos[i].weights;
        } 
    }



}
function keyPressed(){
    
}
function vivos(jogo){
    for(let i=0; i < jogo.length; i++){
        if(jogo[i].vivo)
            return true;
    }
    return false;
}