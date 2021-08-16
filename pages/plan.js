import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

export default function Plan() {
  const [income, setIncome] = useState(85000);
  const [expenses, setExpenses] = useState(35000);
  const [savings, setSavings] = useState(income - expenses);
  const [roi, setRoi] = useState(7 / 100);
  const [show, setShow] = useState(false);
  let moneyNeededToRetire,
    yearsRequired = 1,
    thisYear = new Date().getFullYear(),
    investment = [],
    years = [],
    yearInterest = [],
    yearAmt,
    result;

  const [chart, setChart] = useState({});

  const handleClick = () => {
    setChart({});

    setSavings(income - expenses);

    // cal money needed to retire,
    moneyNeededToRetire = Math.ceil(25 * expenses);
    investment.push(savings);
    years.push(thisYear), (yearAmt = savings);

    do {
      years.push(thisYear + yearsRequired);
      //   Yearly Compound Interest
      yearAmt = Math.ceil(yearAmt * (1 + roi));
      yearInterest.push(Math.ceil(yearAmt - savings));

      //   Investment Value Increase
      if (yearsRequired > 1) {
        investment[yearsRequired - 1] = investment[yearsRequired - 2] + yearAmt;
      } else {
        investment[yearsRequired - 1] = yearAmt;
      }
      console.log(savings, yearInterest[yearsRequired - 1], yearAmt);

      yearsRequired += 1;
    } while (investment[yearsRequired - 2] < moneyNeededToRetire);

    years.pop();

    setChart({
      labels: years,
      datasets: [
        {
          label: "Investment Value",
          data: investment,
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.2,
        },
      ],
    });

    setShow(show ? false : true);
  };

  useEffect(() => {
    result = new Chart("result", {
      type: "line",
      data: chart,
    });
    return () => {
      result.destroy();
    };
  });

  const Result = (
    <canvas className="w-auto h-5/6 md:h-64 lg:h-96" id="result"></canvas>
  );

  const Data = (
    <div className="w-full px-4 center-elements">
      <li className="my-4 center-elements items-start">
        <label
          htmlFor="income"
          className="label-custom text-green-600 opacity-60"
        >
          INCOME
        </label>
        <input
          type="text"
          name="income"
          id="income"
          value={income}
          onChange={(e) => setIncome(e.currentTarget.value)}
          className="input-custom"
        />
      </li>
      <li className="my-4 center-elements items-start">
        <label
          htmlFor="expense"
          className="label-custom text-red-600 opacity-60"
        >
          EXPENSES
        </label>
        <input
          type="text"
          name="expense"
          id="expense"
          value={expenses}
          onChange={(e) => setExpenses(e.currentTarget.value)}
          className="input-custom"
        />
      </li>
      <li className="my-4 center-elements items-start w-full">
        <label
          htmlFor="savings"
          className="label-custom w-max justify-start text-blue-600 opacity-60"
        >
          SAVINGS :{" "}
          <span className="text-black font-bold opacity-100">{savings}</span>
        </label>
      </li>
      <li className="my-4 center-elements items-start">
        <label
          htmlFor="roi"
          className="label-custom w-max text-yellow-600 opacity-60"
        >
          RATE ON INVESTMENT :{" "}
          <span className="text-black font-bold opacity-100">{roi} %</span>
        </label>
        <input
          type="range"
          name="roi"
          id="roi"
          max="60"
          min="4"
          step="1"
          value={roi * 100}
          onChange={(e) => setRoi(e.currentTarget.value / 100)}
          className="input-custom text-indigo-600 opacity-80"
        />
      </li>
    </div>
  );

  return (
    <div className="h-full w-full">
      <Head>
        <title>Plan | Retire Young</title>
        <meta
          name="description"
          content="Information about what's it all about"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1 className="text-lg md:text-4xl lg:text-6xl text-center font-extrabold px-6 pt-6">
          Calculate years left for early retiral. 🕖
        </h1>
        <div className="p-4 w-min my-6 mx-auto center-elements bg-white rounded-2xl shadow-2xl">
          {show ? Result : Data}
          <button className="btn-custom" type="submit" onClick={handleClick}>
            {show ? <>Reset</> : <>Calculate</>}
          </button>
        </div>
      </div>
      <footer className="m-2">
        <Link href="/">
          <button className="btn-custom text-xl">👈 Back</button>
        </Link>
      </footer>
    </div>
  );
}
