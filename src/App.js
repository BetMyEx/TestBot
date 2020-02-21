import React from 'react';
import './App.css';
import ChatForm from "./components/ChatForm";

function App() {
    return (
        <div className="App">
            <div className="header">Чат бот</div>
            <ChatForm />
        </div>
    );
}

export default App;
