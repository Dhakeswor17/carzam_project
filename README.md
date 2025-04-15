# Vehicle Information Scanner


src/
├── assets/              # Images/logos
├── components/          # React components
├── styles/              # CSS/SASS
├── App.js               # Main router
├── infopage.jsx         # Info display
└── LoadingScreen.jsx    # Loading animation

![!(image.png)]


A web application that retrieves detailed vehicle information by license plate number, providing health ratings, safety scores, common issues, and pricing data.

## 🚀 Features
- License plate search for multiple countries
- Vehicle health assessment (1-10 rating)
- Safety rating evaluation
- Common mechanical issues with probability scores
- Price estimation (min/avg/max)
- Responsive mobile-friendly design

## 🛠️ Technologies
**Frontend**: React, Bootstrap, React Router  
**Backend**: Node.js, Express  
**APIs**: RegCheck (vehicle data), OpenAI GPT-4 (data formatting)

## ⚙️ Installation
1. Clone repo: `git@github.com:Dhakeswor17/carzam_project.git`
2. Install dependencies: `npm install`
3. Create `.env` file:
   ```env
   PORT=5000
   VITE_API_URL=http://localhost:5000/
   OPENAI_API_KEY=your_key_here
   regCheckUser=your_regcheck_user

🖥️ Usage
Select country from dropdown

Enter license plate number

View comprehensive report including:

Make, model, year

Vehicle condition score

Safety assessment

Common problems

Price estimates

🔮 Future Plans

Image upload for plate scanning

User accounts/history

Vehicle comparison tool

Maintenance cost estimates