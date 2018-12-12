class Personagem{
    //define o contrutor Nave
    constructor() {
        this.posicao = createVector(width / 2, height / 2); //define a posição inicial como o centro da tela
        this.velocidade = createVector(0, 0); //define a velocidade como o vetor nulo
        this.acele = createVector(0, 0); //define a aceleração como o vetor nulo
        this.gravidade = createVector(0, 0.01);
        this.r = 40; //raio para ser verificado colisões
        this.tamanho = createVector(60, 80);
        this.vivo = true; //define o estado 'morto' como falso
        this.chao=false;

        // this.weight = random();
        
    }

    //define o metodo para mostrar a nave
    draw(cor) {
        stroke(255); //define o contorno com a cor branco
        fill(Math.floor(cor)); //preence a forma com preto
        //console.log(Math.floor(cor));
        push(); //começa uma nova rotina de desenho
        translate(this.posicao.x, this.posicao.y); //muda o centro de cordenadas da tela para a atual posição da nave
        rotate(this.angulo); //roda a nave em seu atual angulo
        rectMode(CENTER);
        //forma da nave se estiver acelerando
        if (true) {
            beginShape();
            vertex(-10, 20);
            vertex(0, 15);
            vertex(10, 20);
            vertex(0, -10);
            endShape(CLOSE);
            beginShape(); //se nave estiver acelerando desenhar as chamas
            vertex(-5, 17.5);
            vertex(-5, 24);
            vertex(0, 28);
            vertex(5, 24);
            vertex(5, 17.5);
            endShape();
        } else {
            //forma da nave se não estiver acelerando
            beginShape();
            vertex(-10, 20);
            vertex(0, 15);
            vertex(10, 20);
            vertex(0, -10);
            endShape(CLOSE);
        }
        pop(); //encerra a nova rotina de desenho a retorna a padrão
    }

    draw_debug(){
        noFill();
        stroke(0,250,0);
        rect(this.posicao.x - this.tamanho.x/2, this.posicao.y - this.tamanho.y/2, 
            this.tamanho.x,this.tamanho.y);
    }

    dist(objeto){
        return dist(this.posicao.x, this.posicao.y, objeto.posicao.x, objeto.posicao.y);
    }

    angulo_obj(objeto){
        return (2* PI       // Pegar o complementar
        - ((this.angulo % (2*PI)) + (2*PI)) % (2*PI)  //calcula o angulo absoluto positivo da nave
        + (atan2(this.posicao.y - objeto.posicao.y ,this.posicao.x - objeto.posicao.x ) +3*PI/2)
        )% (2*PI);   //angulo do meteoro relativo à nave

    }
    //define o metodo para mover a nave
    update(objetos) {
        this.chao=false;
        for(let i=0; i < objetos.length; i++){
            if(objetos[i][0]=='r'){
                // if(collideLineCircle(objetos[i][1], objetos[i][2], objetos[i][1]+objetos[i][3], objetos[i][2], this.posicao.x, this.posicao.y+this.velocidade.y, this.r*2))
                //     chao=true;
                if(collideRectCircle(objetos[i][1], objetos[i][2], objetos[i][3], objetos[i][2], this.posicao.x, this.posicao.y+this.velocidade.y, this.r*2))
                this.chao=true;
            }

        }
        if(!this.chao || (this.velocidade.y<=0)){
            this.posicao.y += (this.velocidade.y);            
        }
        if(this.chao){
            //this.acele.y = 0;
            this.velocidade.y /= 2;
        }

        this.velocidade.add(this.acele);

        this.acele.add(this.gravidade);
    }

    //define o metodo para verificar se a nave se encontra nas bordas da tela
    //e altera a posição da nave para a possição correspondente no oposto da tela
    edges() {
        if (this.posicao.x > width) {
            this.posicao.x = 0;
        } else if (this.posicao.x < 0) {
            this.posicao.x = width;
        }
        if (this.posicao.y > height) {
            this.posicao.y = 0;
        } else if (this.posicao.y < 0) {
            this.posicao.y = height;
        }
    }

    comandoIA(pula){
        if(pula > 0.5){
            this.velocidade.y = -5;
            this.acele.y = 0;
            this.posicao.y -= 5;
        }
    }

    //função do framework p5 que verifica se alguma tecla foi pressionada
    comando() {
        // verifica qual tecla foi pressionada
        if(key == " " && keyIsPressed && this.chao) {
            //se foi seta para cima addiona aceleração a nave
            this.velocidade.y = -5;
            this.acele.y = 0;
            this.posicao.y -= 5;
            key = 1;
        }

        if (keyIsDown(68)) {
            //se foi seta para direita adiona um multiplicador positivo ao angulo para que a nave rode para a direita
            this.posicao.x += 5;
        }
        if (keyIsDown(68)) {
            //se foi seta para direita adiona um multiplicador positivo ao angulo para que a nave rode para a direita
            this.posicao.x += 5;
        }
        if (keyIsDown(65)) {
            //se foi seta para esquerda adiona um multiplicador negativo ao angulo para que a nave rode para a esquerda
            this.posicao.x += -5;
        }
        if (keyIsDown(87)) {//VOO
            this.velocidade.y = -5;
            this.acele.y = 0;
        }

    }

}
