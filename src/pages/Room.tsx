import { useParams } from "react-router";

import { Button } from "../components/Button";
import logoImg from '../assets/images/logo.svg';

import '../styles/room.scss';
import { RoomCode } from "../components/RoomCode";
import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";
import { Question } from "../components/Question";

type FirebaseQuestions = Record<string, {
    author : {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}>

type QuestionType = {
    id: string;
    author : {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}
type RoomParams = {
    id: string;
}

export function Room() {
    const {user} = useAuth();
    const params = useParams<RoomParams>();
    const [newQuestion, setNewQuestion] = useState('');
    const roomId = params.id;
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
        console.log("useEffect");
        console.log(roomId);
        const roomRef = database.ref(`rooms/${roomId}`);

        roomRef.on('value', room => {
            console.log(room.val());
            const databaseRoom = room.val();
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};
            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered,
                }
            });

            console.log(parsedQuestions);
            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions);
        });

    }, [roomId]);

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
                    <h1>Sala {title}</h1>
                    { questions.length > 0 && (
                        <span>{questions.length} pergunta(s)</span>
                    )}
                    
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

                <div className="question-list">
                {questions.map(question => {
                    return (
                        <Question 
                            key={question.id}
                            content={question.content}
                            author={question.author}
                        />
                    )
                })}
                </div>

                
            </main>
        </div>
    );
}