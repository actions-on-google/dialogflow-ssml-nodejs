// Copyright 2017, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/* eslint max-len: 0 */

'use strict';

const {ssml} = require('./utils');

const examples = {
  'break': ssml`
    <speak>
      Step 1, take a deep breath. <break time="200ms" strength="weak"/>
      Step 2, exhale.
    </speak>
  `,
  'say-as': ssml`
    <speak>
      This interprets "12345" normally.
      This interprets "<say-as interpret-as="cardinal">12345</say-as>" as a cardinal.
      This interprets "1" normally.
      This interprets "<say-as interpret-as="ordinal">1</say-as>" as an ordinal.
      This interprets "can" normally.
      This interprets "<say-as interpret-as="characters">can</say-as>" as characters.
      This interprets "5+1/2" normally.
      This interprets "<say-as interpret-as="fraction">5+1/2</say-as>" as a fraction.
      This interprets "censored" normally.
      This interprets "<say-as interpret-as="expletive">censored</say-as>" as an expletive.
      This interprets "10 foot" normally.
      This interprets "<say-as interpret-as="unit">10 foot</say-as>" as a unit.
      This interprets "abcdefg" normally.
      This interprets "<say-as interpret-as="verbatim">abcdefg</say-as>" as verbatim.
      This interprets "1960-09-10" normally.
      This interprets "<say-as interpret-as="date" format="ymd">1960-09-10</say-as>" as a date.
      This interprets "2:30pm" normally.
      This interprets "<say-as interpret-as="time" format="hms12">2:30pm</say-as>" as a time.
      This interprets "(781) 771-7777" normally.
      This interprets "<say-as interpret-as="telephone" format="1">
        (781) 771-7777
      </say-as>" as a telephone number.
    </speak>
  `,
  'audio': ssml`
    <speak>
      <audio src="https://actions.google.com/sounds/v1/animals/cat_purr_close.ogg">
        <desc>Sound of a cat purring.</desc>
        Audio resource for a cat purring failed to load.
      </audio>
    </speak>
  `,
  'paragraph': ssml`
    <speak>
      <p>
        <s>This is sentence one.</s>
        <s>This is sentence two.</s>
      </p>
    </speak>
  `,
  'sub': ssml`
    <speak>
      This is speaking "W3C" normally.
      This is speaking "<sub alias="World Wide Web Consortium">W3C</sub>" using the sub tag.
    </speak>
  `,
  'prosody': ssml`
    <speak>
      <prosody rate="100%" pitch="-2st">
        My name is <prosody rate="slow">Wonder Woman</prosody>.
      </prosody>
      <break time="0.5s" />
      <prosody pitch="+20st">Hi, my name is lowly worm.</prosody>
      <prosody pitch="-10st">Hi, my name is huckleberry cat.</prosody>
      <break time="1.5s" />Was that fun?
      <prosody rate="x-fast">Hi I'm speaking fast.</prosody>
      <prosody rate="x-slow">I'm speaking slow.</prosody>
      <prosody volume="soft">I'm speaking softly.</prosody>
      <prosody volume="x-loud">I'm speaking loud</prosody>
      <prosody pitch="+20st">I'm speaking high.</prosody>
      <prosody pitch="-20st">I'm speaking deep.</prosody>
    </speak>
  `,
  'emphasis': ssml`
    <speak>
      I would like to emphasize the importance of SSML.
      I told you to pick up those toys an hour ago.
      <emphasis>I told you to pick up those toys an hour ago.</emphasis>
      <emphasis level="strong">I told you to pick up those toys an hour ago.</emphasis>
      <emphasis level="moderate">I told you to pick up those toys an hour ago.</emphasis>
      <emphasis level="reduced">I told you to pick up those toys an hour ago.</emphasis>
      <emphasis level="none">I told you to pick up those toys an hour ago.</emphasis>
    </speak>
  `,
  'speed': ssml`
    <speak>
      This is without prosody.
      <prosody rate="100%">This is speaking at 100% rate.</prosody>
      <prosody rate="150%">This is speaking at 150% rate.</prosody>
      <prosody rate="foo">This is speaking at normal rate.</prosody>
      <prosody rate="200%">This is speaking at 200% rate.</prosody>
      <prosody rate="medium">This is speaking at medium rate.</prosody>
      <prosody rate="300%">This is speaking at 300% rate.</prosody>
      <prosody rate="default">This is speaking at default rate.</prosody>
      <prosody rate="75%">This is speaking at 75% rate.</prosody>
      <prosody rate="50%">This is speaking at 50% rate.</prosody>
      <prosody rate="25%">This is speaking at 25% rate.</prosody>
      <prosody rate="10%">This is speaking at 10% rate.</prosody>
    </speak>
  `,
  'volume': ssml`
    <speak>
      This is without prosody.
      <prosody volume="+5dB">This is speaking at +5dB volume.</prosody>
      <prosody volume="100%">This is speaking at 100% volume.</prosody>
      <prosody volume="loud">This is speaking at loud volume.</prosody>
      <prosody volume="foo">This is speaking at normal volume.</prosody>
      <prosody volume="+10dB">This is speaking at +10dB volume.</prosody>
      <prosody volume="medium">This is speaking at medium volume.</prosody>
      <prosody volume="x-loud">This is speaking at x-loud volume.</prosody>
      <prosody volume="default">This is speaking at default volume.</prosody>
      <prosody volume="-5dB">This is speaking at -5dB volume.</prosody>
      <prosody volume="-10dB">This is speaking at -10dB volume.</prosody>
      <prosody volume="soft">This is speaking at soft volume.</prosody>
      <prosody volume="x-soft">This is speaking at x-soft volume.</prosody>
    </speak>
  `,
  'pitch': ssml`
    <speak>
      This is without prosody.
      <prosody pitch="+6st">This is speaking at +6 semitones pitch.</prosody>
      <prosody pitch="foo">This is speaking at normal pitch.</prosody>
      <prosody pitch="high">This is speaking at high pitch.</prosody>
      <prosody pitch="+0st">This is speaking at +0 semitones pitch.</prosody>
      <prosody pitch="medium">This is speaking at medium pitch.</prosody>
      <prosody pitch="default">This is speaking at default pitch.</prosody>
      <prosody pitch="+200%">This is speaking at +200% pitch.</prosody>
      <prosody pitch="+12st">This is speaking at +12 semitones pitch.</prosody>
      <prosody pitch="x-high">This is speaking at x-high pitch.</prosody>
      <prosody pitch="-6st">This is speaking at -6 semitones pitch.</prosody>
      <prosody pitch="low">This is speaking at low pitch.</prosody>
      <prosody pitch="-12st">This is speaking at -12 semitones pitch.</prosody>
      <prosody pitch="x-low">This is speaking at x-low pitch.</prosody>
    </speak>
  `,
  'layered': ssml`
    <speak>
      The key element for layered sound mixing is <sub alias="par">${'<par>'}</sub>
      (as in "parallel") which inserts a mixed sound at the current point of the TTS.
      It is similar to the <sub alias="paragraph">${'<p>'}</sub>
      element with an important difference of not displaying
      the text content in chat bubbles on surfaces with displays.
      <par>
        <media xml:id="first_thing" begin="2.5s">
          <speak>
            This media element contains a <sub alias="speak element">${'<speak>'}</sub> for TTS.
            It has an <say-as interpret-as="verbatim">xml:id</say-as> attribute so that other
            <sub alias="media">${'<media>'}</sub> elements can refer to it.
            There is also a "begin" attribute that delays the start time by 2.5 seconds.
            Millisecond units are also supported by the
            <say-as interpret-as="letters">ms</say-as> suffix.
          </speak>
        </media>
        <media xml:id="second_thing" soundLevel="-1dB" repeatCount="3">
          <audio src="https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg">
            The sound source for this <sub alias="audio">${'<audio>'}</sub> element is missing.
            Find more sounds at https://developers.google.com/actions/tools/sound-library.
          </audio>
        </media>
        <media xml:id="last_thing" begin="first_thing.end + 1234ms">
          <speak>
            This TTS starts <say-as interpret-as="units">1234 milliseconds</say-as>
            after the end of the media element with the
            <say-as interpret-as="verbatim">xml:id</say-as> equal to "first_thing".
          </speak>
        </media>
      </par>
    </speak>
  `,
};

const baseResponses = {
  askExample: 'Ask me for an example of a SSML element.',
};

const elements = Object.keys(examples);

const completeResponses = {
  examplesList: `You can ask me about ${elements.slice(0, elements.length - 1).join(', ')}` +
    `, and ${elements[elements.length - 1]}.`,
  didNotUnderstand: `Sorry, I didn't understand you. ${baseResponses.askExample}.`,
  welcome: `Welcome! ${baseResponses.askExample} ` +
    `You can say "give me an example of the prosody element".`,
  /**
   * @param {string} element
   * @return {string}
   */
  leadToExample: (element) => `Ok, here's an SSML example of ${element}.`,
};

module.exports = {completeResponses, examples};
