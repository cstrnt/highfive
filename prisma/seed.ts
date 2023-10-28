import { PrismaClient, type Question, type Text } from '@prisma/client'
import { it } from 'node:test';
const prisma = new PrismaClient()

type seedQuestion = {
    pdf_id: string;
    answer_type: string;
    text: string;
}

type seedForm = {
    form_name: string;
    questions: Array<seedQuestion>
}

async function storeTranslationText(translation: string, context: string, language: string) : Promise<Text> {
    const textQuestion = await prisma.text.create({
        data: {
            context: context,
        },
    })
    await prisma.textTranslation.create({
        data: {
            language: language,
            textId: textQuestion.id,
            translation: translation,
        },
    })
    return textQuestion
}

async function storeTextQuestion(question: seedQuestion) : Promise<Question> {

    const translationText = await storeTranslationText(question.text, question.pdf_id, 'de-DE')
    const questionDb = await prisma.question.create({
        data: {
            answer_type: question.answer_type,
            question_textId: translationText.id,            
        },
    })
    return questionDb
}

async function main() {

    const asylantrag: seedForm = {
        'form_name': 'asyantrag-schriftlich',
        'questions': [
            {
                pdf_id: 'Beschränkter Asylantrag',
                answer_type: 'checkbox',
                text: 'Unbeschränkter Asylantrag',

            },
            {
                pdf_id: 'Der Antragsteller besitzt einen Aufenthaltstitel mit einer Gesamtgeltungsdauer von mehr als',
                answer_type: 'checkbox',
                text: 'Haben Sie einen Aufenthaltstitel mit einer Gesamtgeltungsdauer von mehr als 6 Monaten?',
            },
            {
                pdf_id: '1 Familienname',
                answer_type: 'text',
                text: 'Familienname',
            },
            {
                pdf_id: '2 Vorname',
                answer_type: 'text',
                text: 'Vorname',
            },
            {
                pdf_id: '3 Geburtsdatum',
                answer_type: 'date',
                text: 'Geburtsdatum',
            },
            {
                pdf_id: '4 Geburtsort',
                answer_type: 'text',
                text: 'Geburtsort',
            },
            {
                pdf_id: '5 Staatsangehörigkeit',
                answer_type: 'text',
                text: 'Staatsangehörigkeit',

            },
            {
                pdf_id: '6 Volkszugehörigkeit',
                answer_type: 'text',
                text: 'Volkszugehörigkeit',
            },
            {
                pdf_id: '7 Religion',
                answer_type: 'text',
                text: 'Religion',
            },
            {
                pdf_id: '8 Familienstand',
                answer_type: 'text',
                text: 'Familienstand',
            },
            {
                pdf_id: '9 Geschlecht',
                answer_type: 'text',
                text: 'Geschlecht',
            },
            {
                pdf_id: '10 Sprache Muttersprache',
                answer_type: 'text',
                text: 'Muttersprache',
            },
            {
                pdf_id: '12 ggf Vertreter  Empfangsberechtig ter Eltern Jugendamt Vormund Rechtsanwalt Bitte ggf Vollmacht oder Bestallung beifügen',
                answer_type: 'text',
                text: 'ggf Vertreter  Empfangsberechtig ter Eltern Jugendamt Vormund Rechtsanwalt Bitte ggf Vollmacht oder Bestallung beifügen',
            },
            {
                pdf_id: 'Personaldokumente zum Beispiel Reisepass IDCard sind in Kopie beigefügt',
                answer_type: 'checkbox',
                text: 'Personaldokumente zum Beispiel Reisepass IDCard sind in Kopie beigefügt',
            },
            {
                pdf_id: 'Vollmacht ist beigefügt',
                answer_type: 'checkbox',
                text: 'Vollmacht ist beigefügt',
            },
            {
                pdf_id: 'Bestallungsurkunde ist beigefügt',
                answer_type: 'checkbox',
                text: 'Bestallungsurkunde ist beigefügt',
            },
            {
                pdf_id: 'Eine Begründung ist diesem Antrag beigefügt',
                answer_type: 'checkbox',
                text: 'Eine Begründung ist diesem Antrag beigefügt',
            },
            {
                pdf_id: '11 Weitere Sprachen oder Dialekte',
                answer_type: 'text',
                text: 'Weitere Sprachen oder Dialekte',
            },
            {
                pdf_id: '12 Gegenwärtige Anschrift',
                answer_type: 'text',
                text: 'Gegenwärtige Anschrift',
            },
            {
                pdf_id: 'in Haft oder sonstigem öffentlichem Gewahrsam',
                answer_type: 'checkbox',
                text: 'in Haft oder sonstigem öffentlichem Gewahrsam',
            },
            {
                pdf_id: 'in einem Krankenhaus bzw einer Heiloder Pflegeanstalt',
                answer_type: 'checkbox',
                text: 'in einem Krankenhaus bzw einer Heiloder Pflegeanstalt',
            },
            {
                pdf_id: 'in einer Jugendhilfeeinrichtung',
                answer_type: 'checkbox',
                text: 'in einer Jugendhilfeeinrichtung',
            },
            {
                pdf_id: 'vorläufige Obhut',
                answer_type: 'checkbox',
                text: 'vorläufige Obhut',
            },
            {
                pdf_id: 'Bestallungsurkunde',
                answer_type: 'text',
                text: 'Bestallungsurkunde',
            },
            {
                pdf_id: 'Aufnahmeeinrichtung',
                answer_type: 'text',
                text: 'Aufnahmeeinrichtung',
            },
            {
                pdf_id: 'Unbeschränkter Asylantrag',
                answer_type: 'checkbox',
                text: 'Unbeschränkter Asylantrag',
            },
        ]
    }

    const translationText = await storeTranslationText(asylantrag.form_name, 'Titel Asylantrag', 'de-DE')
    const form = await prisma.form.create({
        data: {
            name_textId: translationText.id,
        },
    })

    for (let iteration = 0; iteration != asylantrag.questions.length; iteration++) {
        const question = asylantrag.questions[iteration]!
        const questionDb = await storeTextQuestion(question)
        await prisma.questionForm.create({
            data: {
                formId: form.id,
                questionId: questionDb.id,
                questionId_inForm: question.pdf_id,
                position_inForm: iteration,
            },
        })
        iteration++;
    }
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
