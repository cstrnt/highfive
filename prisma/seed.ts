import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

type seedQuestion = {
    id: string;
    answer_type: string;
    text: string;
}

type seedForm = {
    form_name: string;
    questions: Array<seedQuestion>
}

async function storeTextQuestion(question: seedQuestion) : Promise<number> {
    const textQuestion = await prisma.text.create({
        data: {
            id: question.id,
            context: 'question',
        },
    })
    const trasnlationText = await prisma.textTranslation.create({
        data: {
            id: question.id,
            language: 'de-DE',
            textId: textQuestion.id,
            translation: question.text,
        },
    })

    const questionDb = await prisma.question.create({
        data: {
            id: question.id,
            answer_type: question.answer_type,
            textId: textQuestion.id,
        },
    })
    return questionDb.id
}

async function main() {

    const asylantrag: seedForm = {
        'form_name': 'asyantrag-schriftlich',
        'questions': [
            {
                id: 'Beschränkter Asylantrag',
                answer_type: 'checkbox',
                text: 'Unbeschränkter Asylantrag',

            },
            {
                id: 'Der Antragsteller besitzt einen Aufenthaltstitel mit einer Gesamtgeltungsdauer von mehr als',
                answer_type: 'checkbox',
                text: 'Haben Sie einen Aufenthaltstitel mit einer Gesamtgeltungsdauer von mehr als 6 Monaten?',
            },
            {
                id: '1 Familienname',
                answer_type: 'text',
                text: 'Familienname',
            },
            {
                id: '2 Vorname',
                answer_type: 'text',
                text: 'Vorname',
            },
            {
                id: '3 Geburtsdatum',
                answer_type: 'date',
                text: 'Geburtsdatum',
            },
            {
                id: '4 Geburtsort',
                answer_type: 'text',
                text: 'Geburtsort',
            },
            {
                id: '5 Staatsangehörigkeit',
                answer_type: 'text',
                text: 'Staatsangehörigkeit',

            },
            {
                id: '6 Volkszugehörigkeit',
                answer_type: 'text',
                text: 'Volkszugehörigkeit',
            },
            {
                id: '7 Religion',
                answer_type: 'text',
                text: 'Religion',
            },
            {
                id: '8 Familienstand',
                answer_type: 'text',
                text: 'Familienstand',
            },
            {
                id: '9 Geschlecht',
                answer_type: 'text',
                text: 'Geschlecht',
            },
            {
                id: '10 Sprache Muttersprache',
                answer_type: 'text',
                text: 'Muttersprache',
            },
            {
                id: '12 ggf Vertreter  Empfangsberechtig ter Eltern Jugendamt Vormund Rechtsanwalt Bitte ggf Vollmacht oder Bestallung beifügen',
                answer_type: 'text',
                text: 'ggf Vertreter  Empfangsberechtig ter Eltern Jugendamt Vormund Rechtsanwalt Bitte ggf Vollmacht oder Bestallung beifügen',
            },
            {
                id: 'Personaldokumente zum Beispiel Reisepass IDCard sind in Kopie beigefügt',
                answer_type: 'checkbox',
                text: 'Personaldokumente zum Beispiel Reisepass IDCard sind in Kopie beigefügt',
            },
            {
                id: 'Vollmacht ist beigefügt',
                answer_type: 'checkbox',
                text: 'Vollmacht ist beigefügt',
            },
            {
                id: 'Bestallungsurkunde ist beigefügt',
                answer_type: 'checkbox',
                text: 'Bestallungsurkunde ist beigefügt',
            },
            {
                id: 'Eine Begründung ist diesem Antrag beigefügt',
                answer_type: 'checkbox',
                text: 'Eine Begründung ist diesem Antrag beigefügt',
            },
            {
                id: '11 Weitere Sprachen oder Dialekte',
                answer_type: 'text',
                text: 'Weitere Sprachen oder Dialekte',
            },
            {
                id: '12 Gegenwärtige Anschrift',
                answer_type: 'text',
                text: 'Gegenwärtige Anschrift',
            },
            {
                id: 'in Haft oder sonstigem öffentlichem Gewahrsam',
                answer_type: 'checkbox',
                text: 'in Haft oder sonstigem öffentlichem Gewahrsam',
            },
            {
                id: 'in einem Krankenhaus bzw einer Heiloder Pflegeanstalt',
                answer_type: 'checkbox',
                text: 'in einem Krankenhaus bzw einer Heiloder Pflegeanstalt',
            },
            {
                id: 'in einer Jugendhilfeeinrichtung',
                answer_type: 'checkbox',
                text: 'in einer Jugendhilfeeinrichtung',
            },
            {
                id: 'vorläufige Obhut',
                answer_type: 'checkbox',
                text: 'vorläufige Obhut',
            },
            {
                id: 'Bestallungsurkunde',
                answer_type: 'text',
                text: 'Bestallungsurkunde',
            },
            {
                id: 'Aufnahmeeinrichtung',
                answer_type: 'text',
                text: 'Aufnahmeeinrichtung',
            },
            {
                id: 'Unbeschränkter Asylantrag',
                answer_type: 'checkbox',
                text: 'Unbeschränkter Asylantrag',
            },
        ]
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
