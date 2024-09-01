import React, { useState, useEffect } from 'react';
import { UserAuth } from "../context/AuthContext";
import axios from 'axios';

const authKey = '801d74de-1482-4e33-920b-333303fb28a8:fx'; // Replace with your DeepL API key

const detectLanguage = async (text) => {
  const response = await axios.post('https://api-free.deepl.com/v2/translate', null, {
    params: {
      auth_key: authKey,
      text: text,
      target_lang: 'EN', // Default target language for detection
    },
  });

  return response.data.translations[0].detected_source_language;
};

const translateText = async (text, targetLang) => {
  const response = await axios.post('https://api-free.deepl.com/v2/translate', null, {
    params: {
      auth_key: authKey,
      text: text,
      target_lang: targetLang,
    },
  });

  return response.data.translations[0].text;
};

const Message = ({ message }) => {
  const { currentUser } = UserAuth();
  const [translatedText, setTranslatedText] = useState('');

  useEffect(() => {
    const fetchTranslation = async () => {
      const sourceLang = await detectLanguage(message.text);
      const targetLang = sourceLang === 'EN' ? 'ZH' : 'EN';
      const translation = await translateText(message.text, targetLang);
      setTranslatedText(translation);
    };

    fetchTranslation();
  }, [message.text]);

  return (
    <div>
      <div className={`chat ${message.uid === currentUser.uid ? "chat-end" : "chat-start"}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img src={message.avatar} alt="avatar" />
          </div>
        </div>
        <div className="chat-header">
          {message.name}
        </div>
        <div className="chat-bubble">
          <p>{message.text}</p>
          <p>{translatedText}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;