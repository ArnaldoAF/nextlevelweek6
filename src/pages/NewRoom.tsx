import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import '../styles/auth.scss';
import { Button } from '../components/Button';

export function NewRoom() {
    return(
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="ilustração" />
                <strong> Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da suas audiências em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="LetMeAsk" />
                    <h2>Criar uma nova sala</h2>
                    <form action="">
                        <input 
                            type="text" 
                            placeholder="Nome da sla"
                        />
                        <Button type="submit" >
                            Criar sala
                        </Button>

                    </form>
                    <p>
                        Quer entrar em uma sala existente? <a href="#">clique aqui</a>
                    </p>
                </div>
            </main>
        </div>
    )
}