// src/app/arabe/page.js
"use client"

import { useState } from 'react';

const letters = [
  { letter: 'ا', isolated: 'ا', initial: 'ا', medial: 'ـا', final: 'ـا' },
  { letter: 'ب', isolated: 'ب', initial: 'بـ', medial: 'ـبـ', final: 'ـب' },
  { letter: 'ت', isolated: 'ت', initial: 'تـ', medial: 'ـتـ', final: 'ـت' },
  { letter: 'ث', isolated: 'ث', initial: 'ثـ', medial: 'ـثـ', final: 'ـث' },
  { letter: 'ج', isolated: 'ج', initial: 'جـ', medial: 'ـجـ', final: 'ـج' },
  { letter: 'ح', isolated: 'ح', initial: 'حـ', medial: 'ـحـ', final: 'ـح' },
  { letter: 'خ', isolated: 'خ', initial: 'خـ', medial: 'ـخـ', final: 'ـخ' },
  { letter: 'د', isolated: 'د', initial: 'د', medial: 'ـد', final: 'ـد' },
  { letter: 'ذ', isolated: 'ذ', initial: 'ذ', medial: 'ـذ', final: 'ـذ' },
  { letter: 'ر', isolated: 'ر', initial: 'ر', medial: 'ـر', final: 'ـر' },
  { letter: 'ز', isolated: 'ز', initial: 'ز', medial: 'ـز', final: 'ـز' },
  { letter: 'س', isolated: 'س', initial: 'سـ', medial: 'ـسـ', final: 'ـس' },
  { letter: 'ش', isolated: 'ش', initial: 'شـ', medial: 'ـشـ', final: 'ـش' },
  { letter: 'ص', isolated: 'ص', initial: 'صـ', medial: 'ـصـ', final: 'ـص' },
  { letter: 'ض', isolated: 'ض', initial: 'ضـ', medial: 'ـضـ', final: 'ـض' },
  { letter: 'ط', isolated: 'ط', initial: 'طـ', medial: 'ـطـ', final: 'ـط' },
  { letter: 'ظ', isolated: 'ظ', initial: 'ظـ', medial: 'ـظـ', final: 'ـظ' },
  { letter: 'ع', isolated: 'ع', initial: 'عـ', medial: 'ـعـ', final: 'ـع' },
  { letter: 'غ', isolated: 'غ', initial: 'غـ', medial: 'ـغـ', final: 'ـغ' },
  { letter: 'ف', isolated: 'ف', initial: 'فـ', medial: 'ـفـ', final: 'ـف' },
  { letter: 'ق', isolated: 'ق', initial: 'قـ', medial: 'ـقـ', final: 'ـق' },
  { letter: 'ك', isolated: 'ك', initial: 'كـ', medial: 'ـكـ', final: 'ـك' },
  { letter: 'ل', isolated: 'ل', initial: 'لـ', medial: 'ـلـ', final: 'ـل' },
  { letter: 'م', isolated: 'م', initial: 'مـ', medial: 'ـمـ', final: 'ـم' },
  { letter: 'ن', isolated: 'ن', initial: 'نـ', medial: 'ـنـ', final: 'ـن' },
  { letter: 'ه', isolated: 'ه', initial: 'هـ', medial: 'ـهـ', final: 'ـه' },
  { letter: 'و', isolated: 'و', initial: 'و', medial: 'ـو', final: 'ـو' },
  { letter: 'ي', isolated: 'ي', initial: 'يـ', medial: 'ـيـ', final: 'ـي' },
];

const harakat = [
  { name: "Fatha", symbol: "َ", example: "بَ" },
  { name: "Damma", symbol: "ُ", example: "بُ" },
  { name: "Kasra", symbol: "ِ", example: "بِ" },
  { name: "Sukun", symbol: "ْ", example: "بْ" },
];

const harakatExamples = [
  { letter: 'ا', fatha: 'اَ', damma: 'اُ', kasra: 'اِ', sukun: 'اْ' },
  { letter: 'ب', fatha: 'بَ', damma: 'بُ', kasra: 'بِ', sukun: 'بْ' },
  { letter: 'ت', fatha: 'تَ', damma: 'تُ', kasra: 'تِ', sukun: 'تْ' },
  { letter: 'ث', fatha: 'ثَ', damma: 'ثُ', kasra: 'ثِ', sukun: 'ثْ' },
  { letter: 'ج', fatha: 'جَ', damma: 'جُ', kasra: 'جِ', sukun: 'جْ' },
  { letter: 'ح', fatha: 'حَ', damma: 'حُ', kasra: 'حِ', sukun: 'حْ' },
  { letter: 'خ', fatha: 'خَ', damma: 'خُ', kasra: 'خِ', sukun: 'خْ' },
  { letter: 'د', fatha: 'دَ', damma: 'دُ', kasra: 'دِ', sukun: 'دْ' },
  { letter: 'ذ', fatha: 'ذَ', damma: 'ذُ', kasra: 'ذِ', sukun: 'ذْ' },
  { letter: 'ر', fatha: 'رَ', damma: 'رُ', kasra: 'رِ', sukun: 'رْ' },
  { letter: 'ز', fatha: 'زَ', damma: 'زُ', kasra: 'زِ', sukun: 'زْ' },
  { letter: 'س', fatha: 'سَ', damma: 'سُ', kasra: 'سِ', sukun: 'سْ' },
  { letter: 'ش', fatha: 'شَ', damma: 'شُ', kasra: 'شِ', sukun: 'شْ' },
  { letter: 'ص', fatha: 'صَ', damma: 'صُ', kasra: 'صِ', sukun: 'صْ' },
  { letter: 'ض', fatha: 'ضَ', damma: 'ضُ', kasra: 'ضِ', sukun: 'ضْ' },
  { letter: 'ط', fatha: 'طَ', damma: 'طُ', kasra: 'طِ', sukun: 'طْ' },
  { letter: 'ظ', fatha: 'ظَ', damma: 'ظُ', kasra: 'ظِ', sukun: 'ظْ' },
  { letter: 'ع', fatha: 'عَ', damma: 'عُ', kasra: 'عِ', sukun: 'عْ' },
  { letter: 'غ', fatha: 'غَ', damma: 'غُ', kasra: 'غِ', sukun: 'غْ' },
  { letter: 'ف', fatha: 'فَ', damma: 'فُ', kasra: 'فِ', sukun: 'فْ' },
  { letter: 'ق', fatha: 'قَ', damma: 'قُ', kasra: 'قِ', sukun: 'قْ' },
  { letter: 'ك', fatha: 'كَ', damma: 'كُ', kasra: 'كِ', sukun: 'كْ' },
  { letter: 'ل', fatha: 'لَ', damma: 'لُ', kasra: 'لِ', sukun: 'لْ' },
  { letter: 'م', fatha: 'مَ', damma: 'مُ', kasra: 'مِ', sukun: 'مْ' },
  { letter: 'ن', fatha: 'نَ', damma: 'نُ', kasra: 'نِ', sukun: 'نْ' },
  { letter: 'ه', fatha: 'هَ', damma: 'هُ', kasra: 'هِ', sukun: 'هْ' },
  { letter: 'و', fatha: 'وَ', damma: 'وُ', kasra: 'وِ', sukun: 'وْ' },
  { letter: 'ي', fatha: 'يَ', damma: 'يُ', kasra: 'يِ', sukun: 'يْ' },
];

console.log(harakatExamples);


export default function LetterGenerator() {
  const [tab, setTab] = useState("letters");

  console.log("Valeur initiale de tab:", tab);
  console.log("Données des lettres:", letters);
  console.log("Données des harakats:", harakat);

  // Vérifier si `letters` et `harakat` sont bien des tableaux
  if (!Array.isArray(letters)) {
    console.error("Erreur: letters n'est pas un tableau !");
  }
  if (!Array.isArray(harakat)) {
    console.error("Erreur: harakat n'est pas un tableau !");
  }

  return (
    <div className="min-h-screen bg-gray-100 text-center p-6 font-sans">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        تعلم الحروف العربية والحركات
      </h1>
      <div className="flex justify-center mb-6">
        <button
          onClick={() => {
            console.log("Changement de tab vers 'letters'");
            setTab("letters");
          }}
          className={`px-4 py-2 rounded-l bg-${
            tab === "letters" ? "blue" : "gray"
          }-500 text-white`}
        >
          الحروف
        </button>
        <button
          onClick={() => {
            console.log("Changement de tab vers 'harakat'");
            setTab("harakat");
          }}
          className={`px-4 py-2 rounded-r bg-${
            tab === "harakat" ? "blue" : "gray"
          }-500 text-white`}
        >
          الحركات
        </button>
      </div>

      {tab === "letters" && (
        <div className="overflow-x-auto">
          <table className="table-auto mx-auto border border-gray-300 bg-white text-xl">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">الحرف</th>
                <th className="px-4 py-2">بداية</th>
                <th className="px-4 py-2">وسط</th>
                <th className="px-4 py-2">نهاية</th>
                <th className="px-4 py-2">منفصل</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(letters) &&
                letters.map((l, idx) => {
                  console.log(
                    `Affichage de la lettre ${l.letter} à l'index ${idx}`
                  );
                  return (
                    <tr key={idx}>
                      <td className="border px-4 py-2 font-bold">{l.letter}</td>
                      <td className="border px-4 py-2">{l.initial}</td>
                      <td className="border px-4 py-2">{l.medial}</td>
                      <td className="border px-4 py-2">{l.final}</td>
                      <td className="border px-4 py-2">{l.isolated}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}

        {tab === "harakatExamples" && (
  <div className="overflow-x-auto">
    <table className="table-auto mx-auto border border-gray-300 bg-white text-xl">
      <thead>
        <tr className="bg-blue-500 text-white">
          <th className="px-4 py-2">الحرف</th>
          <th className="px-4 py-2">فَتْحَة</th>
          <th className="px-4 py-2">ضَمَّة</th>
          <th className="px-4 py-2">كَسْرَة</th>
          <th className="px-4 py-2">سُكُون</th>
        </tr>
      </thead>
      <tbody>
        {harakatExamples.map((h, idx) => (
          <tr key={idx} className={idx % 2 === 0 ? "bg-gray-100" : "bg-white"}>
            <td className="border px-4 py-2 font-bold">{h.letter}</td>
            <td className="border px-4 py-2 text-red-500">{h.fatha}</td>
            <td className="border px-4 py-2 text-green-500">{h.damma}</td>
            <td className="border px-4 py-2 text-blue-500">{h.kasra}</td>
            <td className="border px-4 py-2 text-gray-500">{h.sukun}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

      // {tab === "harakat" && (
      //   <div className="overflow-x-auto">
      //     <table className="table-auto mx-auto border border-gray-300 bg-white text-xl">
      //       <thead>
      //         <tr className="bg-gray-200">
      //           <th className="px-4 py-2">الحركة</th>
      //           <th className="px-4 py-2">الرمز</th>
      //           <th className="px-4 py-2">مثال</th>
      //         </tr>
      //       </thead>
      //       <tbody>
      //         {Array.isArray(harakat) &&
      //           harakat.map((h, idx) => {
      //             console.log(`Affichage de la haraka ${h.name} à l'index ${idx}`);
      //             return (
      //               <tr key={idx}>
      //                 <td className="border px-4 py-2">{h.name}</td>
      //                 <td className="border px-4 py-2">{h.symbol}</td>
      //                 <td className="border px-4 py-2">{h.example}</td>
      //               </tr>
      //             );
      //           })}
      //       </tbody>
      //     </table>
      //   </div>
      // )}
    </div>
  );
}
