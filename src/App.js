import React, { useState, useEffect } from "react";
import { ArrowRight } from "react-feather";
import axios from "axios";

// const apiKey = import.meta.env.REACT_APP_API_KEY;

const App = () => {
	const [value, setValue] = useState('');
	const [answer, setAnswer] = useState(null);
	const [previousChats, setPreviousChats] = useState([]);
	const [currentTitle, setCurrentTitle] = useState(null);

  const createNewChat = () => {
    setAnswer(null);
    setValue('');
    setCurrentTitle(null);
  }

  const handleClick = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle);
    setAnswer(null);
    setValue('');
  }

	const handleGenerateResponse = async () => {
		const options = {
			method: "POST",
			url: "https://chatgpt-api8.p.rapidapi.com/",
			headers: {
				"content-type": "application/json",
				'X-RapidAPI-Key': '6b1b809205msheba2056c0980b24p12e6e5jsnd2cc2c3562c8',
        'X-RapidAPI-Host': 'chatgpt-api8.p.rapidapi.com'
			},
			data: [
				{
					content: value,
					role: "user",
				},
			],
		};

		try {
			const response = await axios.request(options);
			// console.log(response.data.text);
			setAnswer(response.data.text);
		} catch (error) {
			console.error(error);
		}
	};

	const handleSubmit = () => {
		// console.log(value);
		handleGenerateResponse(); // Call the shared function to handle response generation
    // setTimeout(handleGenerateResponse, 1000);
	};

	useEffect(() => {
		console.log(currentTitle, value, answer);
		if (!currentTitle && value && answer) {
			setCurrentTitle(value);
		}
		if (currentTitle && value && answer) {
			setPreviousChats((previousChats) => [
				...previousChats,
				{
					title: currentTitle,
					role: "user",
					content: value,
				},
				{
					title: currentTitle,
					role: "assistant",
					content: answer,
				},
			]);
		}
	},[answer,currentTitle]);

  console.log(previousChats);

  const currentChat = previousChats.filter(previousChat => previousChat.title === currentTitle)
  const uniqueTitles = Array.from(new Set(previousChats.map(previousChat => previousChat.title)))
  console.log(uniqueTitles);

	return (
		<div className="app">
			<section className="side-bar">
				<button onClick={createNewChat}>+ New Chat</button>
				<ul className="history">
					{uniqueTitles?.map((uniqueTitle, index) => <li key={index} onClick={() => handleClick(uniqueTitle)}>{uniqueTitle}</li>)}
				</ul>
				<nav>
					<p>Made by Yash</p>
				</nav>
			</section>
			<section className="main">
				{!currentTitle && <h1>Content Generator</h1>}
				<ul className="feed">
          {currentChat?.map((chatMessage, index) => <li key={index}>
          <p className="role">{chatMessage.role}</p>
          <p>{chatMessage.content}</p>
          </li>)}
        </ul>
				<div className="bottom-section">
					<div className="input-container">
						<input value={value} onChange={(e) => setValue(e.target.value)} />
						<ArrowRight id="submit" onClick={handleSubmit} />
					</div>
					<p className="info">
						It is a content-generation tool, which works on chat-GPT API which
						is taken from Rapid API.
					</p>
				</div>
			</section>
		</div>
	);
};

export default App;
