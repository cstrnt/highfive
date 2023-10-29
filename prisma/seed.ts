import { PrismaClient, type Question, type Text } from '@prisma/client'
import { it } from 'node:test';
const prisma = new PrismaClient()

type seedQuestion = {
    pdf_id: string;
    answer_type: string;
    text_de: string;
    text_en: string;
}

type seedForm = {
    form_name: string;
    form_nameEn: string;
    questions: Array<seedQuestion>
}

async function storeTranslationText(translationDe: string, translationEn: string, context: string): Promise<Text> {
    const textQuestion = await prisma.text.create({
        data: {
            context: context,
        },
    })
    await prisma.textTranslation.create({
        data: {
            language: 'en-GB',
            textId: textQuestion.id,
            translation: translationEn,
        },
    })
    await prisma.textTranslation.create({
        data: {
            language: 'de-DE',
            textId: textQuestion.id,
            translation: translationDe,
        },
    })
    return textQuestion
}

async function storeTextQuestion(question: seedQuestion): Promise<Question> {

    const translationText = await storeTranslationText(question.text_de, question.text_en, question.pdf_id)
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
        'form_nameEn': 'asyantrag-schriftlich',
        'questions': [
            {
                pdf_id: 'Beschränkter Asylantrag',
                answer_type: 'checkbox',
                text_de: 'Unbeschränkter Asylantrag',
                text_en: 'Unrestricted asylum application',

            },
            {
                pdf_id: 'Der Antragsteller besitzt einen Aufenthaltstitel mit einer Gesamtgeltungsdauer von mehr als',
                answer_type: 'checkbox',
                text_de: 'Haben Sie einen Aufenthaltstitel mit einer Gesamtgeltungsdauer von mehr als 6 Monaten?',
                text_en: 'Do you have a residence permit with a total validity period of more than 6 months?',
            },
            {
                pdf_id: '1 Familienname',
                answer_type: 'text',
                text_de: 'Familienname',
                text_en: 'Family name',
            },
            {
                pdf_id: '2 Vorname',
                answer_type: 'text',
                text_de: 'Vorname',
                text_en: 'First name',
            },
            {
                pdf_id: '3 Geburtsdatum',
                answer_type: 'date',
                text_de: 'Geburtsdatum',
                text_en: 'Date of birth',
            },
            {
                pdf_id: '4 Geburtsort',
                answer_type: 'text',
                text_de: 'Geburtsort',
                text_en: 'Place of birth',
            },
            {
                pdf_id: '5 Staatsangehörigkeit',
                answer_type: 'text',
                text_de: 'Staatsangehörigkeit',
                text_en: "Nationality"
            },
            {
                pdf_id: '6 Volkszugehörigkeit',
                answer_type: 'text',
                text_de: 'Volkszugehörigkeit',
                text_en: 'Ethnic Affiliation',
            },
            {
                pdf_id: '7 Religion',
                answer_type: 'text',
                text_de: 'Religion',
                text_en: 'Religion',
            },
            {
                pdf_id: '8 Familienstand',
                answer_type: 'text',
                text_de: 'Familienstand',
                text_en: 'Marital Status',
            },
            {
                pdf_id: '9 Geschlecht',
                answer_type: 'text',
                text_de: 'Geschlecht',
                text_en: 'Gender',
            },
            {
                pdf_id: '10 Sprache Muttersprache',
                answer_type: 'text',
                text_de: 'Muttersprache',
                text_en: 'Native Language',
            },
            {
                pdf_id: '12 ggf Vertreter  Empfangsberechtig ter Eltern Jugendamt Vormund Rechtsanwalt Bitte ggf Vollmacht oder Bestallung beifügen',
                answer_type: 'text',
                text_de: 'ggf Vertreter  Empfangsberechtig ter Eltern Jugendamt Vormund Rechtsanwalt Bitte ggf Vollmacht oder Bestallung beifügen',
                text_en: 'If applicable, Representative Authorized Recipient Parents Youth Welfare Office Guardian Lawyer Please attach power of attorney or appointment if applicable',
            },
            {
                pdf_id: 'Personaldokumente zum Beispiel Reisepass IDCard sind in Kopie beigefügt',
                answer_type: 'checkbox',
                text_de: 'Personaldokumente zum Beispiel Reisepass IDCard sind in Kopie beigefügt',
                text_en: 'Are identity documents, for example, passport ID Card attached?',
            },
            {
                pdf_id: 'Vollmacht ist beigefügt',
                answer_type: 'checkbox',
                text_de: 'Vollmacht ist beigefügt',
                text_en: 'Is power of attorney attached',
            },
            {
                pdf_id: 'Bestallungsurkunde ist beigefügt',
                answer_type: 'checkbox',
                text_de: 'Bestallungsurkunde ist beigefügt',
                text_en: 'Appointment is attached',
            },
            {
                pdf_id: 'Eine Begründung ist diesem Antrag beigefügt',
                answer_type: 'checkbox',
                text_de: 'Eine Begründung ist diesem Antrag beigefügt',
                text_en: 'A justification is attached to this application',
            },
            {
                pdf_id: '11 Weitere Sprachen oder Dialekte',
                answer_type: 'text',
                text_de: 'Weitere Sprachen oder Dialekte',
                text_en: 'Other languages or dialects',
            },
            {
                pdf_id: '12 Gegenwärtige Anschrift',
                answer_type: 'text',
                text_de: 'Gegenwärtige Anschrift',
                text_en: 'Current address',
            },
            {
                pdf_id: 'in Haft oder sonstigem öffentlichem Gewahrsam',
                answer_type: 'checkbox',
                text_de: 'in Haft oder sonstigem öffentlichem Gewahrsam',
                text_en: 'in custody or other public custody',
            },
            {
                pdf_id: 'in einem Krankenhaus bzw einer Heiloder Pflegeanstalt',
                answer_type: 'checkbox',
                text_de: 'in einem Krankenhaus bzw einer Heiloder Pflegeanstalt',
                text_en: 'in a hospital, healing or nursing home',
            },
            {
                pdf_id: 'in einer Jugendhilfeeinrichtung',
                answer_type: 'checkbox',
                text_de: 'in einer Jugendhilfeeinrichtung',
                text_en: 'in a youth welfare facility',
            },
            {
                pdf_id: 'vorläufige Obhut',
                answer_type: 'checkbox',
                text_de: 'vorläufige Obhut',
                text_en: 'temporary custody',
            },
            {
                pdf_id: 'Bestallungsurkunde',
                answer_type: 'text',
                text_de: 'Bestallungsurkunde',
                text_en: 'Appointment',
            },
            {
                pdf_id: 'Aufnahmeeinrichtung',
                answer_type: 'text',
                text_de: 'Aufnahmeeinrichtung',
                text_en: 'Intake facility',
            },
            {
                pdf_id: 'Unbeschränkter Asylantrag',
                answer_type: 'checkbox',
                text_de: 'Unbeschränkter Asylantrag',
                text_en: 'Unrestricted asylum application',
            },
        ]
    }

    const translationText = await storeTranslationText(asylantrag.form_name, asylantrag.form_nameEn, 'Titel Asylantrag')
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
