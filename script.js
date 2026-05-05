"use strict";

// --- Завдання 1: Змінні та типи даних ---
console.log("--- Завдання 1: Змінні та типи даних ---");

const myString = "Привіт, JavaScript!";
const myNumber = 2026;
const myBoolean = true;
const myNull = null;
const myUndefined = undefined;
const mySymbol = Symbol("id");
const myBigInt = 9007199254740991n;

console.log(`Значення: ${myString}, Тип: ${typeof myString}`);
console.log(`Значення: ${myNumber}, Тип: ${typeof myNumber}`);
console.log(`Значення: ${myBoolean}, Тип: ${typeof myBoolean}`);
console.log(`Значення: ${myNull}, Тип: ${typeof myNull}`); 
console.log(`Значення: ${myUndefined}, Тип: ${typeof myUndefined}`);
console.log(`Значення: Symbol, Тип: ${typeof mySymbol}`);
console.log(`Значення: ${myBigInt}, Тип: ${typeof myBigInt}`);

console.log("Перетворення у String:", String(myNumber), String(false));
console.log("Перетворення у Number:", Number("123"), Number(""), Number(true), Number(null), Number(undefined));
console.log("Boolean (Falsy):", Boolean(0), Boolean(""), Boolean(null), Boolean(NaN));
console.log("Boolean (Truthy):", Boolean("0"), Boolean([]), Boolean({}));

const name = "Іван Сеньків";
const age = 20;
const university = "Харківський авіаційний інститут";
console.log(`Студент: ${name}, вік: ${age}, університет: ${university}`);

console.log("Порівняння 5 == '5':", 5 == '5');   
console.log("Порівняння 5 === '5':", 5 === '5'); 
console.log("Порівняння 0 == false:", 0 == false);

// --- Завдання 2: Умови та логіка ---
console.log("\n--- Завдання 2: Умови та логіка ---");

function getGrade(score) {
    if (typeof score !== "number" || score < 0 || score > 100) return "невалідний бал";
    if (score >= 90) return "відмінно";
    if (score >= 75) return "добре";
    if (score >= 60) return "задовільно";
    return "незадовільно";
}
console.log(`Бал 85: ${getGrade(85)}`);
console.log(`Бал 45: ${getGrade(45)}`);

function getSeasonUA(month) {
    switch (month) {
        case 12: case 1: case 2: return "Зима";
        case 3: case 4: case 5: return "Весна";
        case 6: case 7: case 8: return "Літо";
        case 9: case 10: case 11: return "Осінь";
        default: return "невалідний місяць";
    }
}
console.log(`Місяць 4: ${getSeasonUA(4)}`);

const checkAge = 19;
console.log(`Статус (19 років): ${checkAge >= 18 ? "повнолітній" : "неповнолітній"}`);

// --- Завдання 3: Масиви ---
console.log("\n--- Завдання 3: Масиви ---");

let students = [
    { name: "Олена Коваленко", grade: 87, courses: ["JavaScript", "HTML"] },
    { name: "Іван Петренко", grade: 92, courses: ["CSS", "JavaScript"] },
    { name: "Марія Сидоренко", grade: 55, courses: ["HTML"] },
    { name: "Петро Іванов", grade: 78, courses: ["JavaScript"] },
    { name: "Анна Мельник", grade: 95, courses: ["React", "JavaScript"] },
    { name: "Олег Бондар", grade: 62, courses: ["CSS"] }
];

students.push({ name: "Дмитро Кушнір", grade: 81, courses: ["HTML"] });
students.splice(2, 1); 
console.log("Перший відмінник (>90):", students.find(s => s.grade > 90));
const avg = students.reduce((acc, s) => acc + s.grade, 0) / students.length;
console.log("Середня оцінка студентів:", avg.toFixed(2));

// --- Завдання 4: Функції ---
console.log("\n--- Завдання 4: Функції ---");

const areaArrow = (a, b) => a * b;
console.log(`Площа (Arrow): ${areaArrow(5, 10)}`);

function createCounter() {
    let count = 0;
    return {
        increment: () => ++count,
        getValue: () => count
    };
}
const counter = createCounter();
counter.increment();
counter.increment();
console.log("Значення лічильника:", counter.getValue());

const sumAll = (...numbers) => numbers.reduce((a, b) => a + b, 0);
console.log("Сума чисел (10, 20, 30):", sumAll(10, 20, 30));

// --- Завдання 5: Обʼєкти ---
console.log("\n--- Завдання 5: Обʼєкти ---");

const studentProfile = {
    firstName: "Іван",
    lastName: "Сеньків",
    age: 20,
    grades: { math: 85, js: 98 },
    getFullName() { return `${this.firstName} ${this.lastName}`; }
};

console.log("Повне ім'я:", studentProfile.getFullName());
const profileCopy = { ...studentProfile, isActive: true };
console.log("Копія об'єкта (spread):", profileCopy);
console.log("Optional chaining:", studentProfile.grades?.math);

// --- Завдання 6: Ланцюжки методів масивів ---
console.log("\n--- Завдання 6: Ланцюжки методів ---");

const products = [
    { name: "Ноутбук", price: 25000, category: "electronics", inStock: true, quantity: 5 },
    { name: "Смартфон", price: 15000, category: "electronics", inStock: true, quantity: 8 },
    { name: "Навушники", price: 2000, category: "electronics", inStock: false, quantity: 0 },
    { name: "Монітор", price: 8000, category: "electronics", inStock: true, quantity: 3 },
    { name: "Клавіатура", price: 1500, category: "electronics", inStock: true, quantity: 10 },
    { name: "Стіл", price: 5000, category: "furniture", inStock: true, quantity: 2 },
    { name: "Крісло", price: 3500, category: "furniture", inStock: true, quantity: 4 },
    { name: "Лампа", price: 1200, category: "furniture", inStock: false, quantity: 0 }
];

const totalValue = products
    .filter(p => p.inStock)
    .map(p => p.price * p.quantity)
    .reduce((acc, current) => acc + current, 0);

console.log("Загальна вартість товарів у наявності:", totalValue);

const electronicsSorted = products
    .filter(p => p.category === "electronics")
    .sort((a, b) => a.price - b.price)
    .map(p => p.name);

console.log("Електроніка за ціною:", electronicsSorted);

const categoryStats = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
}, {});
console.log("Товарів за категоріями:", categoryStats);

const sortedByGrade = [...students].sort((a, b) => b.grade - a.grade);
console.log("Студенти за рейтингом:", sortedByGrade);

// --- Завдання 7: Рядки ---
console.log("\n--- Завдання 7: Рядки ---");

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
console.log(`Капіталізація 'javaScript': ${capitalize("javaScript")}`);

const countWords = (str) => str.trim().split(/\s+/).length;
console.log(`Слів у рядку: ${countWords("JavaScript це дуже круто")}`);

const truncate = (str, maxLength) => str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
console.log(truncate("Це довгий текст для прикладу", 15));

function isValidEmail(email) {
    const parts = email.split('@');
    if (parts.length !== 2) return false;
    const [before, after] = parts;
    if (before.length === 0 || !after.includes('.')) return false;
    const lastDotIndex = after.lastIndexOf('.');
    const domain = after.slice(lastDotIndex + 1);
    return domain.length >= 2;
}

console.log("Email test (valid):", isValidEmail("user@example.com"));
console.log("Email test (invalid):", isValidEmail("invalid-email"));