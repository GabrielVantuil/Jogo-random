class Jogo{
    constructor(){
        this.tiros = [];
        this.tempo = 10000;
        this.pontos = 0;
        this.estado = 0;
        this.vivo = true;
        this.personagem = new Personagem();
        //cria o lugar onde o jogo acontecerá
        createCanvas(windowWidth * 0.99, windowHeight * 0.95);

        this.color = Math.random()*100;
        this.distSensor;
        frameRate(1000);
        this.mlp = new Mlp(1, 2, 1);
        this.obstaculo = new Inimigo();
    }

    comandoIA(){
        this.distSensor = dist(this.obstaculo);
        this.personagem.comandoIA(this.mlp.predict(this.distSensor));
    }


    update(objetos){
        this.personagem.update(objetos);
        this.personagem.edges();
        this.personagem.comando();
        this.obstaculo.update(objetos);
        if(this.obstaculo.posicao.x<=0)
            this.obstaculo = new Inimigo();
        if(this.atingida(this.personagem,this.obstaculo)){
            this.personagem.vivo=0;
        }
    }

    atingida(personagem, objeto) {
        //cria a variavel 'd' que recebe a distancia entre a posicção atual da personagem e o objeto que foi passado como parâmetro
        var d = dist(
            personagem.posicao.x,
            personagem.posicao.y,
            objeto.posicao.x,
            objeto.posicao.y
        );
        if (d < (personagem.r + objeto.r)) {
           // console.log("e morreu " + this.num);
            //se o raio de colisão do personagem for menor que sua soma com o raio do metroro
                this.vivo = false;
        }
    }

    draw_game(objetos) {
        background(0);
        if(this.personagem.vivo)
            this.personagem.draw(50);
        this.obstaculo.draw();
        this.personagem.draw_debug();
        for(let i=0;i < objetos.length; i++){
            if(objetos[i][0]=='r'){
                stroke(0);
                fill(objetos[i][5]);
                // noFill();
                rect(objetos[i][1], objetos[i][2], objetos[i][3], objetos[i][4]);
            }

        }

    }
}