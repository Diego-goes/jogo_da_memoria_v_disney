class Jogo {
    constructor(qtdPares) {
        this.qtdPares = qtdPares;
        this.cartas = []
        this.imgDirCartas = [
            "A_Bela_e_a_Fera.jpeg",
            "a_familia_do_futuro.jpg",
            "a_nova_onda_do_imperador.JPG",
            "aladdin.jpeg",
            "atlantis.jpg",
            "Bolt-filme.jpg",
            "chicken_little.JPG",
            "Hercules.jpeg",
            "irmao_urso.JPG",
            "lilo_e_stitch.jpeg",
            "Nem_Que_A_Vaca_Tussa.jpeg",
            "o_bom_dinossauro.JPG",
            "rei_leao.jpg",
            "selvagem.jpeg",
            "Tarzan.jpg"
        ]
        this.iniciar()
    }
    iniciar() {
        this.separarCartas()
        this.criarCartas()
        this.distribuirCartas()
        this.addEventSelecionar()
    }
    embaralharDirCartas() {
        this.imgDirCartas.sort(() => Math.random() - 0.5);
    }
    separarCartas() {
        let cartasUsadas = []
        for (let i = 0; i < this.qtdPares; i++) {
            cartasUsadas.push(this.imgDirCartas[i])
        }
        this.imgDirCartas = [...cartasUsadas]
    }
    encerrar() {

    }

    revelarPares() {

    }

    criarCartas() {
        let numId = 0
        for (let j = 0; j < 2; j++) {
            this.embaralharDirCartas()
            for (let i = 0; i < this.qtdPares; i++) {
                let carta = new Carta(`./assets/images/${this.imgDirCartas[i]}`, numId)
                carta = carta.criarElementoHtml()
                this.cartas.push(carta)
                numId += 1
            }
        }
    }
    distribuirCartas() {
        for (let i in this.cartas)
            document.querySelector('#mesa').appendChild(this.cartas[i])
    }
    addEventSelecionar() {
        this.cartas.forEach((element) => {
            element.addEventListener("click", () => {
                this.selecionar(element)
            })
        })
    }
    selecionar(element) {
        element.children[0].classList.add('reveladas')
        if (this.verificarPar() && this.conjuntoRevelado() > 1) {
            let cartasReveladas = document.querySelectorAll('.reveladas')
            cartasReveladas.forEach((e) => {
                setTimeout(() => { 
                    e.classList.remove('reveladas')
                    e.parentElement.classList.add('pares_costas')
                    e.classList.add('pares_frente')
                }, 300)
            })
        } else if (!this.verificarPar() && this.conjuntoRevelado() > 1) {
            this.esconderCartas(element.children[0])
        }
    }
    esconderCartas(ultimaCarta) {
        this.cartas.forEach((element) => {
            if (this.conjuntoRevelado() == 2) {
                setTimeout(() => { element.children[0].classList.remove('reveladas') }, 500)
            } else if (this.conjuntoRevelado() == 3) {
                if (element.children[0].src != ultimaCarta.src) {
                    element.children[0].classList.remove('reveladas')
                }
            }
        })
    }
    verificarPar() {
        let cartasReveladas = document.querySelectorAll('.reveladas')
        if (cartasReveladas.length > 1) {
            return cartasReveladas[0].src == cartasReveladas[1].src ? true : false
        }
    }
    conjuntoRevelado() {
        let cartasReveladas = document.querySelectorAll('.reveladas')
        return cartasReveladas.length
    }
}
class Carta {
    constructor(imgDir, id) {
        this.imgDir = imgDir;
        this.id = id;
    }

    criarElementoHtml() {
        let cartaFrente = document.createElement("img")
        cartaFrente.setAttribute("id", `frente_${this.id}`)
        cartaFrente.setAttribute("class", "cartas_frente")
        cartaFrente.src = this.imgDir
        let cartaCostas = document.createElement("div")
        cartaCostas.setAttribute("class", "cartas_costas")
        cartaCostas.setAttribute("id", `costas_${this.id}`)
        cartaCostas.appendChild(cartaFrente)
        return cartaCostas
    }
}
document.querySelectorAll('.inputsQtdCartas').forEach((element)=>{
    element.addEventListener('click', ()=>{
        document.querySelector('#mesa').innerHTML = ''
        let jogo = new Jogo(element.value/2)}
        )
})
