import { useParams } from "react-router";

import { Button } from "../components/Button";
import logoImg from '../assets/images/logo.svg';

import '../styles/room.scss';
import { RoomCode } from "../components/RoomCode";

type RoomParams = {
    id: string;
}

export function Room() {
    const params = useParams<RoomParams>();

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="letmeask" />
                    <RoomCode code={params.id}/>
                </div>
            </header>

            <main className="content">
                <div className="room-title">
                    <h1>Sala React</h1>
                    <span>4 perguntas</span>
                </div>

                <form action="">
                    <textarea placeholder="O que você quer perguntar?" />

                    <div className="form-footer">
                        <span>Para enviar uma pergunta, <button>Faça seu login</button>.</span>
                        <Button type="submit">Enviar pergunta </Button>
                    </div>
                </form>
            </main>
        </div>
    );
}