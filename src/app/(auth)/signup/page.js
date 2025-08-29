import { useState } from 'react';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const handleSignup = async () => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('phone_number', phone);
    if(profileImage) formData.append('profile_image', profileImage);

    const res = await fetch('https://https://food99api.onrender.com/api/signup/', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    if(res.ok){
      alert('User created successfully!');
    } else {
      alert('Signup failed: ' + JSON.stringify(data));
    }
  };

  return (
    <div>
      <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <input type="text" placeholder="Phone Number" onChange={e => setPhone(e.target.value)} />
      <input type="file" onChange={e => setProfileImage(e.target.files[0])} />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
}
