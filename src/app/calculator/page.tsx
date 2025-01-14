"use client";
import { useEffect, useState } from "react";
import { config } from "@/config";

import { formatPrice } from "@/utils/formatPrice";

import styles from "./styles.module.css";

interface Tax {
  name: string;
  percentage: number;
  id: number;
}

interface Dolar {
  name: string;
  price: number;
  id: number;
}

const Page = () => {
  const [result, setResult] = useState<number>(0);
  const [input, setInput] = useState<string>(""); // Cambiado a string para evitar NaN
  const [dolar, setDolar] = useState<Dolar[]>([]);
  const [currency, setCurrency] = useState<string>("USD");
  const [taxes, setTaxes] = useState<Tax[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value);
  };

  const fetchDolar = async () => {
    try {
      const response = await fetch(`${config.baseURL}/api/dolar`);
      const data = await response.json();

      console.log(data);

      setDolar(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTaxes = async () => {
    try {
      const response = await fetch(`${config.baseURL}/api/taxes`);
      const data = await response.json();

      console.log(data);

      setTaxes(data);
    } catch (error) {
      console.error(error);
    }
  };

  const calculateResult = () => {
    const inputValue = parseFloat(input.toString());
    if (isNaN(inputValue)) {
      setResult(0);
      return;
    }

    // Asegurarnos de que `taxes` es un array antes de usar reduce
    const totalTaxes = Array.isArray(taxes)
      ? taxes.reduce((acc, tax) => acc + tax.percentage, 0)
      : 0;

    // Obtener el precio del dólar (suponemos que el primero en el array es el correcto)
    const dolarPrice = dolar[0]?.price || 1;

    let finalResult = 0;

    if (currency === "ARS") {
      // Para ARS, solo sumamos impuestos
      finalResult = inputValue * (1 + totalTaxes);
    } else if (currency === "USD") {
      // Para USD, convertimos a ARS y luego sumamos impuestos
      finalResult = inputValue * dolarPrice * (1 + totalTaxes);
    }

    setResult(finalResult);
  };

  useEffect(() => {
    fetchTaxes();
    fetchDolar();
  }, []);

  return (
    <section className={styles.container}>
      <h1>Calculator</h1>
      <div className={styles.inputGroup}>
        <input
          type="text"
          value={input}
          onChange={handleChange}
          className={styles.input}
          placeholder="Enter amount"
        />

        <select
          value={currency}
          onChange={handleCurrencyChange}
          className={styles.selectInput}
        >
          <option value="USD">USD</option>
          <option value="ARS">ARS</option>
        </select>
      </div>

      <button onClick={calculateResult} className={styles.button}>
        Calculate
      </button>

      <ul>
        {taxes?.map((tax) => (
          <li key={tax.id}>
            <p>
              {tax.name} - {tax.percentage * 100}%
            </p>
          </li>
        ))}
      </ul>
      <ul>
        {dolar?.map((dolar) => (
          <li key={dolar.id}>
            <p>
              {dolar.name} - ${dolar.price}
            </p>
          </li>
        ))}
      </ul>

      <h2 className={styles.result}>Result: {formatPrice(result)}</h2>
    </section>
  );
};

export default Page;