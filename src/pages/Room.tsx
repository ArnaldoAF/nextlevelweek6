import { useParams } from "react-router";

import { Button } from "../components/Button";
import logoImg from '../assets/images/logo.svg';

import '../styles/room.scss';
import { RoomCode } from "../components/RoomCode";
import { FormEvent, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";

type RoomParams = {
    id: string;
}

export function Room() {
    const {user} = useAuth();
    const params = useParams<RoomParams>();
    const [newQuestion, setNewQuestion] = useState('');
    const roomId = params.id;

    async function handleSendQuestion(event : FormEvent) {
        event.preventDefault();
        if(newQuestion.trim()==='') return;

        if (!user) {
            throw new Error('Usuario ñ logado');
        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar
            },
            isHighlighted: false,
            isAnswered: false,
        }

        await database.ref(`rooms/${roomId}/questions`).push(question);
        setNewQuestion('');
        

    }

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

                <form onSubmit={handleSendQuestion}>
                    <textarea 
                    placeholder="O que você quer perguntar?" 
                    onChange={event => setNewQuestion(event.target.value)}
                    value={newQuestion}
                    />

                    <div className="form-footer">
                        { user ? (
                            <div className="user-info">
                                <img src={user.avatar} alt="" />
                                <span>{user.name}</span>
                            </div>
                        ) : (
                        <span> Para enviar uma pergunta, <button>Faça seu login</button>.</span>)
                        }
                        
                        <Button type="submit" disabled={!user}>Enviar pergunta </Button>
                    </div>
                </form>
            </main>
        </div>
    );
}