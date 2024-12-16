const chai = require('chai');
const assert = chai.assert;
function testTranslations(translator, direction, sentences){
    sentences.forEach(([start, end])=>{
        test(`Translate: ${start}`, (done)=>{
            try{
                const text = start;
                const expectedTranslation = end;
                direction === "a-b" && translator.american_to_british(text);
                direction === "b-a" && translator.british_to_american(text);
                assert.strictEqual(translator.translated, expectedTranslation);
            } catch (err) {
                assert.fail(`Error during translation: ${err.message}`);
            }
            done();
        })
    })
}
const Translator = require('../components/translator.js');
suite('Unit Tests', () => {
    const translator = new Translator();
    
    suite("American to British", ()=>{
        const translationStartAndEnd = [
            [`Mangoes are my favorite fruit.`, `Mangoes are my <span class="highlight">favourite</span> fruit.`],
            [`I ate yogurt for breakfast.`, `I ate <span class="highlight">yoghurt</span> for breakfast.`],
            [`We had a party at my friend's condo.`, `We had a party at my friend's <span class="highlight">flat</span>.`],
            [`Can you toss this in the trashcan for me?`, `Can you toss this in the <span class="highlight">bin</span> for me?`],
            [`The parking lot was full.`, `The <span class="highlight">car park</span> was full.`],
            [`Like a high tech Rube Goldberg machine.`, `Like a high tech <span class="highlight">Heath Robinson device</span>.`],
            [`To play hooky means to skip class or work.`, `To <span class="highlight">bunk off</span> means to skip class or work.`],
            [`No Mr. Bond, I expect you to die.`, `No <span class="highlight">Mr</span> Bond, I expect you to die.`],
            [`Dr. Grosh will see you now.`, `<span class="highlight">Dr</span> Grosh will see you now.`],
            [`Lunch is at 12:15 today.`, `Lunch is at <span class="highlight">12.15</span> today.`]
        ];
        testTranslations(translator, "a-b", translationStartAndEnd);
    })
    suite("British to American", ()=>{
        const translationStartAndEnd = [
            [`We watched the footie match for a while.`, `We watched the <span class="highlight">soccer</span> match for a while.`],
            [`Paracetamol takes up to an hour to work.`, `<span class="highlight">Tylenol</span> takes up to an hour to work.`],
            [`First, caramelise the onions.`, `First, <span class="highlight">caramelize</span> the onions.`],
            [`I spent the bank holiday at the funfair.`, `I spent the <span class="highlight">public holiday</span> at the <span class="highlight">carnival</span>.`],
            [`I had a bicky then went to the chippy.`, `I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-<span class="highlight">fish-and-chip shop</span></span>.`],
            [`I've just got bits and bobs in my bum bag.`, `I've just got <span class="highlight">odds and ends</span> in my <span class="highlight">fanny pack</span>.`],
            [`The car boot sale at Boxted Airfield was called off.`, `The <span class="highlight">swap meet</span> at Boxted Airfield was called off.`],
            [`Have you met Mrs Kalyani?`, `Have you met <span class="highlight">Mr.</span>s Kalyani?`],
            [`Prof Joyner of King's College, London.`, `<span class="highlight">Prof.</span> Joyner of King's College, London.`],
            [`Tea time is usually around 4 or 4.30.`, `Tea time is usually around 4 or <span class="highlight">4:30</span>.`],
   
        ];
        testTranslations(translator, "b-a", translationStartAndEnd);
    })
    suite("Highlighting", ()=>{
        let translationStartAndEnd = [
            [`Mangoes are my favorite fruit.`,`Mangoes are my <span class="highlight">favourite</span> fruit.`],
            [`I ate yogurt for breakfast.`,`I ate <span class="highlight">yoghurt</span> for breakfast.`]
        ]
        testTranslations(translator, "a-b", translationStartAndEnd);

        translationStartAndEnd = [
            [`We watched the footie match for a while.`,`We watched the <span class="highlight">soccer</span> match for a while.`],
            [`Paracetamol takes up to an hour to work.`,`<span class="highlight">Tylenol</span> takes up to an hour to work.`]
        ]
        testTranslations(translator, "b-a", translationStartAndEnd);
    })
});
