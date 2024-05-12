import { useState } from "react";
import Papa from "papaparse";

export default function Home() {
  const [inputRoll, setInputRoll] = useState("");
  const [rank, setRank] = useState(null);
  const [showAdvice, setShowAdvice] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitClicked(true);

    const response = await fetch("/ranked_file.csv");
    const csv = await response.text();

    const { data } = Papa.parse(csv, { header: true });

    const rollNumber = parseInt(inputRoll);
    const rollData = data.find(
      (row) => parseInt(row["Roll Number"]) === rollNumber
    );

    if (rollData) {
      setRank(rollData.Rank);
    } else {
      setRank(null);
    }
  };

  const toggleAdvice = () => {
    setShowAdvice(!showAdvice);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 text-black">
      <div className="md:hidden w-full p-4 bg-yellow-200 border border-blue-600 mt-8">
        <p className="font-bold text-lg">Disclaimer</p>
        <p className="font-bold">
          Currently, This ranking is only for Chattogram board. If you are from
          any other board and want to know your rank, please contact me on
          Facebook. My Facebook ID is:{" "}
          <a
            href="https://www.facebook.com/profile.php?id=100042767077083"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-500"
          >
            Yasir Rahman
          </a>
        </p>
      </div>

      <div className="md:hidden w-full p-4 bg-yellow-200 border border-blue-600 mt-8 text-center">
        <button
          className="text-lg font-bold underline mb-2"
          onClick={toggleAdvice}
        >
          Here is an Advice for you
        </button>
      </div>

      {showAdvice && (
        <div className="md:hidden w-full p-4 bg-yellow-200 border border-blue-600 mt-2">
          <p className="font-bold">
            Hey Brother/Sister, if Your rank is not what you wish, this is not
            the end. You can still work on yourself. Life is a Marathon and
            everyone will win one day later or one week later or one year later.
            Please, Work on yourself and do not waste time on results. Work on
            your skills. Hopefully, I will meet your better version in the
            future!
          </p>
          <button
            className="text-sm font-bold underline mt-2"
            onClick={toggleAdvice}
          >
            Close Advice
          </button>
        </div>
      )}

      <div className="w-full max-w-md">
        <h1 className="text-3xl text-center font-bold mt-6 mb-8">
          Find Your Rank (SSC)
        </h1>
        <form onSubmit={handleSubmit} className="mb-8">
          <label className="block mb-4">
            Enter Roll Number:
            <input
              type="number"
              value={inputRoll}
              onChange={(e) => setInputRoll(e.target.value)}
              className="block w-full p-2 border-2 border-blue-500 rounded focus:outline-none focus:border-blue-600"
            />
          </label>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Submit
          </button>
        </form>
        {submitClicked && (
          <>
            {rank !== null && (
              <p className="text-green-600 text-center font-bold text-lg">
                Rank of Roll Number {inputRoll} is {rank}
              </p>
            )}
            {!rank && inputRoll && (
              <p className="text-red-600 text-center font-bold text-lg">
                Roll Number not found
              </p>
            )}
          </>
        )}
      </div>

      <div className="absolute top-0 right-0 w-full md:w-1/3 p-4 bg-yellow-200 border border-blue-600 mt-8 hidden md:block">
        <p className="font-bold text-lg mb-2">Disclaimer</p>
        <p className="font-bold text-sm">
          Currently, this ranking is only for the Chattogram board. If you are
          from any other board and want to know your rank, please contact me on
          Facebook. My Facebook ID is:{" "}
          <a
            href="https://www.facebook.com/profile.php?id=100042767077083"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-500"
          >
            Yasir Rahman
          </a>
        </p>
      </div>

      <div className="absolute top-1/3 right-0 w-full md:w-1/3 p-4 bg-yellow-200 border border-blue-600 mt-8 hidden md:block">
        <p className="font-bold text-lg mb-2">Advice</p>
        <p className="font-bold text-sm">
          Hey Brother/Sister, if Your rank is not what you wish, this is not the
          end. You can still work on yourself. Life is a Marathon and everyone
          will win one day later or one week later or one year later. Please,
          Work on yourself and do not waste time on results. Work on your
          skills. Hopefully, I will meet your better version in the future!
        </p>
      </div>

      <div className="w-full max-w-md p-4 bg-yellow-200 mt-6 border border-blue-600 text-center">
        <p className="font-bold flex items-center justify-center">
          <span className="mr-2">⚠️</span> The ranking might not be accurate!
          But it is close to accurate. You can get an overview of your RANK
          within your board.
        </p>
      </div>
    </div>
  );
}
