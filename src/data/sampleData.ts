// import {Section} from "../models/FileInput.ts";
import {SampleSection} from "../models/sampleModels.ts";

export const SectionData: SampleSection[] = [
    {
        title: 'Introduction',
        body: 'Natural language processing (NLP) is a subfield of computer science and artificial intelligence (AI) that uses machine learning to enable computers to understand and communicate with human language.\n' +
            '\n' +
            'NLP enables computers and digital devices to recognize, understand and generate text and speech by combining computational linguistics—the rule-based modeling of human language—together with statistical modeling, machine learning and deep learning.\n' +
            '\n' +
            'NLP research has helped enable the era of generative AI, from the communication skills of large language models (LLMs) to the ability of image generation models to understand requests. NLP is already part of everyday life for many, powering search engines, prompting chatbots for customer service with spoken commands, voice-operated GPS systems and question-answering digital assistants on smartphones such as Amazon’s Alexa, Apple’s Siri and Microsoft’s Cortana.\n' +
            '\n' +
            'NLP also plays a growing role in enterprise solutions that help streamline and automate business operations, increase employee productivity and simplify business processes.' +
            '\n' +
            'NLP makes it easier for humans to communicate and collaborate with machines, by allowing them to do so in the natural human language they use every day. This offers benefits across many industries and applications.',
        inferenced_text: 'inference',
        arguments: [
            {start: 10, end: 50, type: 'background_claim'},
            {start: 75, end: 110, type: 'own_claim'},
            {start: 120, end: 165, type: 'own_claim'},
            {start: 231, end: 278, type: 'data'},
            {start: 320, end: 400, type: 'data'},
        ]
    },
    {
        title: 'Related Work',
        body: 'Even state-of-the-art NLP models are not perfect, just as human speech is prone to error. As with any AI technology, NLP comes with potential pitfalls. Human language is filled with ambiguities that make it difficult for programmers to write software that accurately determines the intended meaning of text or voice data. Human language might take years for humans to learn—and many never stop learning. But then programmers must teach natural language-powered applications to recognize and understand irregularities so their applications can be accurate and useful. Associated risks might include:' +
        '\n' +
        'As in programming, there is a risk of garbage in, garbage out (GIGO). Speech recognition, also known as speech-to-text, is the task of reliably converting voice data into text data. But NLP solutions can become confused if spoken input is in an obscure dialect, mumbled, too full of slang, homonyms, incorrect grammar, idioms, fragments, mispronunciations, contractions or recorded with too much background noise.',
        inferenced_text: 'inference',
        arguments: [
            {start: 15, end: 70, type: 'background_claim'},
            {start: 75, end: 140, type: 'data'},
            {start: 190, end: 265, type: 'data'}
        ]
    },

]