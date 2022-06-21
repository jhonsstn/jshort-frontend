import { useState } from 'react';

function App() {
  const [longUrl, setLongUrl] = useState<string>('');
  const [shortUrl, setShortUrl] = useState<string>('');

  const handleSubmit = async (): Promise<void> => {
    const response = await fetch('https://jshort.herokuapp.com/create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ longUrl }),
    });
    const data = await response.json();

    setShortUrl(data[0].shortUrl);
  };

  return (
    <>
      <header>
        <h1 className="flex justify-center text-3xl font-bold mb-6">JShort</h1>
      </header>
      <main>
        <form
          className="flex w-auto justify-center mb-6"
          onSubmit={handleSubmit}
        >
          <label className="flex justify-center ml" htmlFor="longUrl">
            URL:
            <input
              className="border-slate-500 border-2 rounded ml-2 w-[500px]"
              value={longUrl}
              type="text"
              id="longUrl"
              name="longUrl"
              onChange={({ target }) => setLongUrl(target.value)}
            />
          </label>
          <button className="bg-slate-400" type="submit">
            Encurtar
          </button>
        </form>
        <div className=" w-screen flex justify-center">
          {shortUrl.length > 0 ? (
            <>
              <span className="mr-1">Short URL:</span>
              <a href={shortUrl} target="_blank">
                {shortUrl}
              </a>
            </>
          ) : null}
        </div>
      </main>
      <footer className="fixed bottom-0 w-screen flex justify-center">
        JShort Footer
      </footer>
    </>
  );
}
export default App;
