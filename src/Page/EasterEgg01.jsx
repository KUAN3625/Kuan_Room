import React, { useState } from 'react'

const EasterEgg01 = ({ onBack, lang }) => {
    const [input, setInput] = useState("");
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [errorHint, setErrorHint] = useState("");

    const t = {
        Ch: {
            title: "渲染錯誤物件?",
            hint: "error",
            secret: "一些訊息...",
            back: "返回場景",
            reset: "清除",
            err1: "位移了多少位?",
            err2: "字母渲染錯誤....",
            devTitle: "Access // 0x13",
            p1: "我不太常這麼直接在作品上留下訊息，不過既然你解碼了，也許代表你有多逛逛這裡？",

            p3: "在這條道路上我受過許多人的幫助，也收到過非常多的反饋。感謝目前正在閱讀這則訊息的你，也感謝一路以來支持的人。",
            p4: "前面的路還很漫長，能與你們繼續向前是我的榮幸。感謝！",
            aiNote: ""
        },
        En: {
            title: "Render error object?",
            hint: "error",
            secret: "A few words....",
            back: "Back to scene",
            reset: "Clear",
            err1: "How many positions offset?",
            err2: "Character rendering error....",
            devTitle: "Access // 0x13",
            p1: "I don't usually leave messages directly on my work, but since you've decoded this, perhaps it means you've explored a bit?",
            p3: "I've received so much help and feedback along this journey. Thank you for reading this, and thanks to everyone who has supported me along the way.",
            p4: "The road ahead is long, and it's an honor to keep moving forward with all of you. Thank you!",
            aiNote: "*Translated by AI"
        },
        Jp: {
            title: "描画エラーオブジェクト？",
            hint: "error",
            secret: "ちょっとしたメッセージ....",
            back: "戻る",
            reset: "クリア",
            err1: "どれだけズレていますか？",
            err2: "文字のレンダリングエラー....",
            devTitle: "Access // 0x13",
            p1: "作品に直接メッセージを残すことはあまりありませんが、デコードに成功したということは、ここを隅々まで見てくれたということでしょうか？",
            p3: "この道のりで多くの助けとフィードバックをいただきました。今これを読んでいるあなた、そしてこれまで支えてくれたすべての人に感謝します。",
            p4: "これからの道のりはまだ長いですが、皆さんと共に歩んでいけることを光栄に思います。ありがとう！",
            aiNote: "*AIによる翻訳"
        }
    }[lang] || { Ch: { title: "渲染錯誤物件?" } };

    const handleKeyPress = (num) => {
        if (input.length < 2 && !isUnlocked) {
            const newInput = input + num;
            setInput(newInput);
            setErrorHint("");

            if (newInput === "13") {
                setTimeout(() => setIsUnlocked(true), 200);
            } else if (newInput.length === 2) {
                const randomMsg = Math.random() > 0.5 ? t.err1 : t.err2;
                setTimeout(() => {
                    setErrorHint(randomMsg);
                    setInput("");
                }, 400);
            }
        }
    };

    return (
        <div className="absolute inset-0 bg-white/5 backdrop-blur-md flex items-center justify-center z-50 px-4" onClick={onBack}>
            <div
                className="relative w-[95%] max-w-md max-h-[90vh] p-6 md:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(180,83,9,0.15)] 
                           bg-orange-50/95 border border-white/60 flex flex-col transition-all duration-500 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* 裝飾背景 */}
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-200/40 rounded-full blur-3xl -z-10"></div>
                <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-rose-200/30 rounded-full blur-3xl -z-10"></div>

                {!isUnlocked ? (
                    <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
                        <h1 className="text-2xl font-black mb-2 text-orange-900">{t.title}</h1>
                        <p className="text-orange-800/40 text-[10px] font-bold tracking-widest uppercase mb-8">{t.hint}</p>

                        <div className="flex gap-4 mb-2">
                            {[0, 1].map((i) => (
                                <div key={i} className="w-12 h-16 bg-white/60 border-2 border-orange-200 rounded-2xl flex items-center justify-center shadow-inner">
                                    <span className="text-2xl font-black text-orange-900">
                                        {input[i] ? "●" : ""}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="h-10 flex items-start justify-center mt-2 text-center">
                            {errorHint && (
                                <p className="text-stone-400 text-[10px] font-medium tracking-tight italic">
                                    {"> "}{errorHint}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-3 gap-3 mb-8">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                                <button
                                    key={num}
                                    onClick={() => handleKeyPress(num.toString())}
                                    className="w-14 h-14 md:w-16 md:h-16 bg-white/80 rounded-2xl font-black text-orange-900 shadow-sm border border-orange-100
                                               hover:bg-orange-100 active:scale-95 transition-all text-xl"
                                >
                                    {num}
                                </button>
                            ))}
                            <button onClick={() => setInput("")} className="col-span-3 py-2 text-orange-800/30 text-xs font-bold hover:text-orange-600 transition-colors">
                                [ {t.reset} ]
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col min-h-0 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <h1 className="text-xl font-black mb-4 text-orange-900 tracking-tight text-center">{t.secret}</h1>

                        {/* 捲動區域：包含文字與圖片 */}
                        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-6">
                            <div className="bg-orange-100/40 p-5 rounded-2xl border border-orange-200/50 text-stone-700 leading-relaxed text-[13px] text-left">
                                <p className="font-bold text-orange-800 mb-2 font-mono uppercase tracking-tighter border-b border-orange-200/50 pb-1 flex justify-between items-end">
                                    <span>{t.devTitle}</span>
                                    <span className="text-[9px] opacity-40">{t.aiNote}</span>
                                </p>
                                <div className="space-y-3 opacity-90">
                                    <p>{t.p1}</p>
                                    <p>{t.p3}</p>
                                    <p>{t.p4}</p>
                                </div>
                            </div>

                            {/* 圖片區域：自適應長比例圖 */}
                            <div className="w-full bg-orange-100 rounded-2xl overflow-hidden shadow-inner border border-orange-200/30">
                                <img
                                    src="img/bg/egg.jpg"
                                    alt="Easter Egg"
                                    className="w-full h-auto block" // h-auto 確保長圖能完整顯示
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>
                )}

                <button
                    onClick={onBack}
                    className="w-full py-4 mt-6 bg-orange-800 text-white rounded-2xl font-black text-lg
                               hover:bg-orange-900 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shrink-0"
                >
                    {t.back}
                </button>
            </div>
        </div>
    )
}

export default EasterEgg01