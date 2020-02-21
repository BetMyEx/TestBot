import React from 'react';
import './style.css';

class ChatForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editMessage: ``,
            messages: [],
            isStarted: false,
            isCalculateStart: false,
            numbers: []
        }
    }

    onChangeMessage = ({ target }) => {
        this.setState({ editMessage: target.value })
    };

    onSendMessage = () => {
        const { editMessage, isStarted, messages, isCalculateStart, numbers } = this.state;

        messages.push({
            text: editMessage,
            author: `me`
        });

        if (isStarted) {
            if (isCalculateStart) {
                if (editMessage === '*' || editMessage === '+' || editMessage === '-' || editMessage === '/') {
                    messages.push({
                        text: `Результат: ${eval(numbers.join(editMessage))}`,
                        author: `bot`
                    });
                    this.setState({ isCalculateStart: false, numbers: [] })
                } else {
                    messages.push({
                        text: `Выберите одной из действий: -, +, *, /`,
                        author: `bot`
                    })
                }
            }

            if ( editMessage.indexOf(`/name:`) >= 0 ) {
                messages.push({
                    text: `Привет ${editMessage.slice(6).trim()}, приятно познакомится. Я умею считать, введи числа которые надо посчитать`,
                    author: `bot`
                })
            }
            if ( editMessage.indexOf(`/stop`) >= 0 ) {
                messages.push({
                    text: `Всего доброго, если хочешь поговорить пиши /start`,
                    author: `bot`
                });
                this.setState({ isStarted: false })
            }
            if ( editMessage.indexOf(`/number:`) >= 0 ) {
                debugger
                const numbers = editMessage.slice(8).replace(/\s+/g, ``).split(`,`);
                if (numbers.length > 1 && numbers.length <= 2) {
                    this.setState({ isCalculateStart: true, numbers });
                    messages.push({
                        text: `Выберите одной из действий: -, +, *, /`,
                        author: `bot`
                    })
                } else {
                    messages.push({
                        text: `Пожалуйста ввдеде ДВА числа`,
                        author: `bot`
                    })
                }
            }
        } else {
            if ( editMessage !== `/start`) {
                messages.push({
                    text: `Введите команду /start, для начала общения`,
                    author: `bot`
                })
            } else {
                messages.push({
                    text: `Привет, меня зовут Чат-бот, а как зовут тебя?`,
                    author: `bot`
                });
                this.setState({ isStarted: true })
            }
        }
        this.setState({ editMessage: `` })
    };

    render() {
        const { editMessage } = this.state;

        return <div className="chat">
            <div className="messages">
                {this.state.messages.map((message) => {
                    return <div className={`message`}>
                        <div className={`avatar ${message.author}`}/>
                        <div className={`text ${message.author}`}>{message.text}</div>
                    </div>
                })}
            </div>
            <div className="inputWrapper">
                <input onChange={this.onChangeMessage} className="input" value={editMessage} />
                <button className="button" onClick={editMessage ? this.onSendMessage : null}>
                    <svg className="img" viewBox="0 0 40 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 34.2724L39.9627 17.1455L0 0.0186768V13.3396L28.5448 17.1455L0 20.9515V34.2724Z" fill={editMessage ? `#F9C25D` : `#919191`}/>
                    </svg>
                </button>
            </div>
        </div>;
    }
}

export default ChatForm;
