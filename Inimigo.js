class Inimigo {
    //define o construtor inimigo
    constructor(posicao, r, nave, velocidade) {
        if (posicao) {
            //se foi passado uma posição como parâmetro a posição passada é copida
            this.posicao = posicao.copy();
        } else {
            
//            this.posicao = createVector((random(width) + 300) %width, (random(height) + 300)%height); //se não uma posição aleatoria é gerada
           this.posicao = createVector(width, 0); //se não uma posição aleatoria é gerada
        }

        if (r) {
            //se foi passado um raio como parâmetro o raio passado é dividido por 2
            this.r = r * 0.5;
        } else {
            this.r = random(15, 50); //se não um raio aleátorio é gerado
        }

        if (nave) {
            this.posicao = createVector(
                random(width) + nave.posicao.x * random(),
                random(height) + nave.posicao.y * random()
            );
        }        
        this.acele = createVector(0, 0); //define a aceleração como o vetor nulo

        if (velocidade) {
            this.velocidade = velocidade;

        }
        else
            this.velocidade = createVector(-5,+5); //define a aceleração como um vetor aleatorio
        this.total = floor(random(5, 15)); //toral de pontos para o desenho do inimigo como um numero aleatorio

        //vetor que amazenará numeros aleatorios para ligar os pontos e dar forma ao contorno do inimigo
        this.offset = [];
        for (var i = 0; i < this.total; i++) {
            this.offset[i] = random(-this.r * 0.5, this.r * 0.5);
        }
    }

    //define o metodo que move o inimigo
    update(objetos) {
        
        let chao=false;
        for(let i=0; i < objetos.length; i++){
            if(objetos[i][0]=='r'){
                // if(collideLineCircle(objetos[i][1], objetos[i][2], objetos[i][1]+objetos[i][3], objetos[i][2], this.posicao.x, this.posicao.y+this.velocidade.y, this.r*2))
                //     chao=true;
                if(collideRectCircle(objetos[i][1], objetos[i][2], objetos[i][3], objetos[i][2], this.posicao.x, this.posicao.y+this.velocidade.y, this.r*2))
                    chao=true;
            }

        }
        if(!chao || (this.velocidade.y<=0)){
            this.posicao.y += this.velocidade.y;            
        }
        if(chao){
            //this.acele.y = 0;
            this.velocidade.y /= 2;
        }
        this.posicao.x -=3;
        this.velocidade.add(this.acele);

        this.acele.add(this.gravidade);
        
    }

    //define o metodo para mostrar o inimigo
    draw() {
        push(); //inicia uma nova rotina de desenho
        stroke(255); //define o contorno com a cor branco
        noFill(); //define que o que for desenhado nao será preenchido
        translate(this.posicao.x, this.posicao.y); //muda o centro de cordenadas da tela para a atual posição do inimigo
        //ellipse(this.posicao.x, this.posicao.y, this.r*2, this.r*2);
        beginShape(); //começa a desenhar uma forma
        for (var i = 0; i < this.total; i++) {
            var angle = map(i, 0, this.total, 0, TWO_PI); //é gerado um numero entre proporcional de 0 a 2pi a depender do ponto
            var r = this.r + this.offset[i]; //um novo raio é definido a partir do atual somado com o offset
            //é definido o novo vertice da forma usando coordenadas polares
            var x = r * cos(angle);
            var y = r * sin(angle);
            vertex(x, y);
        }
        endShape(CLOSE); //encherra o desenho da forma
        pop(); //encerra a nova rotina de desenho a retorna a padrão
    }

    //metodo para quebrar o inimigo se quando atingido seu raio for maior que 30
    quebrar() {
        var novosM = [];
        novosM[0] = new Meteoro(this.posicao, this.r);
        novosM[1] = new Meteoro(this.posicao, this.r);
        return novosM;
    }
}
