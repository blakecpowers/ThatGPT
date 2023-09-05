### IMPORTANT: This site has been deprecated due to billing costs


# ThatGPT - https://that-gpt.vercel.app/
&nbsp;&nbsp; A ChatGPT clone utilizing the OpenAI API https://openai.com/api/ <br>
&nbsp;&nbsp; Uses Node.js for server side requests. <br>
&nbsp;&nbsp; Makes API Requests to OpenAI's ChatGPT. <br> 
&nbsp;&nbsp; Responsive layout with CSS. <br>
<br> 

# OpenAI ChatGPT Parameters Used
Model: text-davinci-003 <br>
&nbsp;&nbsp; ID of the model to use. text davinci 003 offers higher quality writing and can handle more comples instructions. It also is better at longer form content generation, including code generation. <br> 
<br>
Temperature: 0 <br>
&nbsp;&nbsp; What sampling temperature to use. temperature can range from 0 to 1. Temperature of 1 being taking the most risks, with posbility of giving an incorrect answer and Temperature 0 being the lowest risk option. <br>
<br>
Max Tokens: 3000 <br>
&nbsp;&nbsp; The maximum number of tokens to generate in the completion. Since the normal range is from 2046 to 4096, a middleground of ~3000~ was chosen. <br>
<br>
Top_p: 1 <br>
&nbsp;&nbsp; OpenAI reccomends either tempering with top_p or temperature but not both, so the default value was kept. <br>
Frequence Penalty: 0.5 <br>
&nbsp;&nbsp; A value between -2.0 and 2.0 where the higher the value, the less likely the model will repeat itself. Without  introducing risk of answers being too short/concise, a value of 0.5 was chosen.<br>
<br>
Presence Penalty: 0.5 <br>
&nbsp;&nbsp; A value between -2.0 and 2.0 where Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.<br>
<br>

# Hosted
The server is hosted on the free platform render.com where you can deploy the AI backend, check logs, add environment variables, etc. <br>
![Screen Shot 2023-02-01 at 6 19 40 PM](https://user-images.githubusercontent.com/22222231/216209049-459ff1e2-751d-46ed-beec-425e5ab90e0e.png)
![Screen Shot 2023-02-01 at 6 20 34 PM](https://user-images.githubusercontent.com/22222231/216209064-de62559a-7b08-44c0-a380-1a4dd2523620.png)
The frontend is hosted on vercel where our URL is provided for us. <br>
https://that-gpt.vercel.app/ <br>
Both of these deployments are pointing directly at the server / script outlined in this repo. <br> 

# Examples
![Screen Shot 2023-02-01 at 6 24 28 PM](https://user-images.githubusercontent.com/22222231/216209262-b70f0abf-a573-47c9-b6ae-86a3f08f1366.png)
![Screen Shot 2023-02-01 at 6 28 44 PM](https://user-images.githubusercontent.com/22222231/216209265-8928bcbb-aa08-467e-b146-56865ad49589.png)
