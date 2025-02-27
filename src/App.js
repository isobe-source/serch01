import React, { useState, useEffect } from "react";

const JsonPlaceholderSearch = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [idRange, setIdRange] = useState(10);
  const [showEmail, setShowEmail] = useState(true);
  const [showPhone, setShowPhone] = useState(true);
  const [showWebsite, setShowWebsite] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRangeChange = (event) => {
    setIdRange(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (name === "email") setShowEmail(checked);
    if (name === "phone") setShowPhone(checked);
    if (name === "website") setShowWebsite(checked);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      user.id <= idRange
  );

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">ユーザー検索</h1>
      
      <input
        type="text"
        placeholder="名前で検索..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="border p-2 w-full mb-2"
      />
      
      <div className="mb-2">
        <label>
          ID範囲: {idRange}
          <input
            type="range"
            min="1"
            max="10"
            value={idRange}
            onChange={handleRangeChange}
            className="w-full"
          />
        </label>
      </div>
      
      <div className="mb-2">
        <label className="mr-4">
          <input type="checkbox" name="email" checked={showEmail} onChange={handleCheckboxChange} /> メールを表示
        </label>
        <label className="mr-4">
          <input type="checkbox" name="phone" checked={showPhone} onChange={handleCheckboxChange} /> 電話を表示
        </label>
        <label>
          <input type="checkbox" name="website" checked={showWebsite} onChange={handleCheckboxChange} /> ウェブサイトを表示
        </label>
      </div>
      
      <ul className="border p-2">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <li key={user.id} className="p-2 border-b last:border-none">
              <strong>名前:</strong> {user.name} <br/>
              <strong>ユーザー名:</strong> {user.username} <br/>
              {showEmail && (<><strong>メール:</strong> {user.email} <br/></>)}
              <strong>住所:</strong> {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode} <br/>
              {showPhone && (<><strong>電話:</strong> {user.phone} <br/></>)}
              {showWebsite && (<><strong>ウェブサイト:</strong> {user.website} <br/></>)}
              <strong>会社:</strong> {user.company.name} - {user.company.catchPhrase} ({user.company.bs})
            </li>
          ))
        ) : (
          <li className="text-gray-500">該当するユーザーが見つかりません</li>
        )}
      </ul>
    </div>
  );
};

export default JsonPlaceholderSearch;
