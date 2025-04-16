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
  { name: 'Fatha', symbol: 'َ', example: 'بَ' },
  { name: 'Damma', symbol: 'ُ', example: 'بُ' },
  { name: 'Kasra', symbol: 'ِ', example: 'بِ' },
  { name: 'Sukun', symbol: 'ْ', example: 'بْ' },
];


export default function LetterGenerator() {
  const [tab, setTab] = useState<'letters' | 'harakat'>('letters');

  return (
    <div className="min-h-screen bg-gray-100 text-center p-6 font-sans">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">تعلم الحروف العربية والحركات</h1>
      <div className="flex justify-center mb-6">
        <button onClick={() => setTab('letters')} className={`px-4 py-2 rounded-l bg-${tab === 'letters' ? 'blue' : 'gray'}-500 text-white`}>
          الحروف
        </button>
        <button onClick={() => setTab('harakat')} className={`px-4 py-2 rounded-r bg-${tab === 'harakat' ? 'blue' : 'gray'}-500 text-white`}>
          الحركات
        </button>
      </div>

      {tab === 'letters' && (
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
              {letters.map((l, idx) => (
                <tr key={idx}>
                  <td className="border px-4 py-2 font-bold">{l.letter}</td>
                  <td className="border px-4 py-2">{l.initial}</td>
                  <td className="border px-4 py-2">{l.medial}</td>
                  <td className="border px-4 py-2">{l.final}</td>
                  <td className="border px-4 py-2">{l.isolated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'harakat' && (
        <div className="overflow-x-auto">
          <table className="table-auto mx-auto border border-gray-300 bg-white text-xl">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">الحركة</th>
                <th className="px-4 py-2">الرمز</th>
                <th className="px-4 py-2">مثال</th>
              </tr>
            </thead>
            <tbody>
              {harakat.map((h, idx) => (
                <tr key={idx}>
                  <td className="border px-4 py-2">{h.name}</td>
                  <td className="border px-4 py-2">{h.symbol}</td>
                  <td className="border px-4 py-2">{h.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
