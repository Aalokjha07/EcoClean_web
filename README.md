🌿 EcoClean: Urban Revitalization Platform
EcoClean is a smart-city digital nervous system designed to bridge the gap between citizens, field staff, and urban administrators. By transforming physical urban decay into actionable digital data, EcoClean ensures that cities are maintained at their maximum utilization.

🚀 The Vision
Urban environments often suffer from a "disconnect" between a problem occurring and a solution being implemented. EcoClean solves this through Radical Transparency:

Crowdsourced Reporting: Citizens act as the eyes of the city, reporting issues like potholes and garbage in real-time.

Verified Accountability: Every fix requires "Before" and "After" visual evidence to ensure high-quality infrastructure repair.

Incentivized Workforce: Field staff are rewarded with performance-based bonuses for verified tasks.

🛠️ Technical Stack
Frontend: React.js, Tailwind CSS (Bento UI Design), Vite.

Backend: Node.js, Express.js.

Database: MongoDB.

Maps: Google Maps API (Geospatial tracking and marker dragging).

📦 Installation & Setup
1. Clone the Repository
Bash

git clone https://github.com/your-username/ecoclean.git
cd ecoclean
2. Frontend Configuration
Navigate to the frontend folder and install dependencies:

Bash

cd frontend
npm install
Create a .env file in the frontend root:

Code snippet

VITE_GOOGLE_MAPS_API_KEY=your_google_maps_key_here
3. Backend Configuration
Navigate to the backend folder and install dependencies:

Bash

cd ../backend
npm install
Create a .env file in the backend root:

Code snippet

PORT=3000
MONGODB_URI=your_mongodb_connection_string
🗺️ Google Maps Integration
The platform utilizes the @react-google-maps/api for precise location reporting.

Interactive Markers: Users can drag markers to pinpoint exact issue locations.

Geolocation: One-tap "Find My Location" for instant reporting.

#images of development mode Homepage
<img width="1918" height="1076" alt="Image" src="https://github.com/user-attachments/assets/d9b5ff2b-acf3-4ecb-b855-a4e4c912a3fc" />

#images of development model Dashboards
<img width="1110" height="549" alt="image" src="https://github.com/user-attachments/assets/6b46432a-dbe3-40fd-ae3a-3962e3dd143c" />
above are the dashboard interface of the user , staff and admin page

#Fleetmap : a system that help staff locate and get to the report location
<img width="1919" height="1074" alt="Image" src="https://github.com/user-attachments/assets/c6e85fa2-18df-44c0-a35a-bb0ac6c56d99" />




🎨 Design Language
The UI follows a Bento-style layout, utilizing the "Plus Jakarta Sans" typeface for a modern, clean, and scannable user experience. It features:

High Contrast Status Tags: Instant visual feedback on report status (Pending, Fixed, Verified).

Glassmorphism Elements: Modern modal overlays for success and error handling.

📜 License
Distributed under the MIT License.




