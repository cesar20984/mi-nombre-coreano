/**
 * Core transliteration engine — shared between the generator component and shared views.
 */

const charMap = {
  'a': '아', 'b': '비', 'c': '시', 'd': '디', 'e': '에',
  'f': '에프', 'g': '지', 'h': '에이치', 'i': '아이', 'j': '제이',
  'k': '케이', 'l': '엘', 'm': '엠', 'n': '엔', 'o': '오',
  'p': '피', 'q': '큐', 'r': '아르', 's': '에스', 't': '티',
  'u': '유', 'v': '브이', 'w': '더블유', 'x': '엑스', 'y': '와이', 'z': '제트',
  'ñ': '니',
};

const phoneticMap = {
  'ba': '바', 'be': '베', 'bi': '비', 'bo': '보', 'bu': '부',
  'ca': '카', 'ce': '세', 'ci': '시', 'co': '코', 'cu': '쿠',
  'da': '다', 'de': '데', 'di': '디', 'do': '도', 'du': '두',
  'fa': '파', 'fe': '페', 'fi': '피', 'fo': '포', 'fu': '푸',
  'ga': '가', 'ge': '헤', 'gi': '히', 'go': '고', 'gu': '구',
  'ha': '아', 'he': '에', 'hi': '이', 'ho': '오', 'hu': '우',
  'ja': '하', 'je': '헤', 'ji': '히', 'jo': '호', 'ju': '후',
  'ka': '카', 'ke': '케', 'ki': '키', 'ko': '코', 'ku': '쿠',
  'la': '라', 'le': '레', 'li': '리', 'lo': '로', 'lu': '루',
  'ma': '마', 'me': '메', 'mi': '미', 'mo': '모', 'mu': '무',
  'na': '나', 'ne': '네', 'ni': '니', 'no': '노', 'nu': '누',
  'pa': '파', 'pe': '페', 'pi': '피', 'po': '포', 'pu': '푸',
  'ra': '라', 're': '레', 'ri': '리', 'ro': '로', 'ru': '루',
  'sa': '사', 'se': '세', 'si': '시', 'so': '소', 'su': '수',
  'ta': '타', 'te': '테', 'ti': '티', 'to': '토', 'tu': '투',
  'va': '바', 've': '베', 'vi': '비', 'vo': '보', 'vu': '부',
  'ya': '야', 'ye': '예', 'yo': '요', 'yu': '유',
  'za': '사', 'ze': '세', 'zi': '시', 'zo': '소', 'zu': '수',
};

const pCharMap = {
  'a': 'a', 'b': 'bi', 'c': 'shi', 'd': 'di', 'e': 'e',
  'f': 'e-peu', 'g': 'ji', 'h': 'e-i-chi', 'i': 'a-i', 'j': 'je-i',
  'k': 'ke-i', 'l': 'el', 'm': 'em', 'n': 'en', 'o': 'o',
  'p': 'pi', 'q': 'kyu', 'r': 'a-reu', 's': 'e-seu', 't': 'ti',
  'u': 'yu', 'v': 'beu-i', 'w': 'deo-beul-yu', 'x': 'ek-seu', 'y': 'wa-i', 'z': 'je-teu',
  'ñ': 'ni',
};

const pPhoneticMap = {
  'ba': 'ba', 'be': 'be', 'bi': 'bi', 'bo': 'bo', 'bu': 'bu',
  'ca': 'ka', 'ce': 'se', 'ci': 'shi', 'co': 'ko', 'cu': 'ku',
  'da': 'da', 'de': 'de', 'di': 'di', 'do': 'do', 'du': 'du',
  'fa': 'pa', 'fe': 'pe', 'fi': 'pi', 'fo': 'po', 'fu': 'pu',
  'ga': 'ga', 'ge': 'he', 'gi': 'hi', 'go': 'go', 'gu': 'gu',
  'ha': 'a', 'he': 'e', 'hi': 'i', 'ho': 'o', 'hu': 'u',
  'ja': 'ha', 'je': 'he', 'ji': 'hi', 'jo': 'ho', 'ju': 'hu',
  'ka': 'ka', 'ke': 'ke', 'ki': 'ki', 'ko': 'ko', 'ku': 'ku',
  'la': 'ra', 'le': 're', 'li': 'ri', 'lo': 'ro', 'lu': 'ru',
  'ma': 'ma', 'me': 'me', 'mi': 'mi', 'mo': 'mo', 'mu': 'mu',
  'na': 'na', 'ne': 'ne', 'ni': 'ni', 'no': 'no', 'nu': 'nu',
  'pa': 'pa', 'pe': 'pe', 'pi': 'pi', 'po': 'po', 'pu': 'pu',
  'ra': 'ra', 're': 're', 'ri': 'ri', 'ro': 'ro', 'ru': 'ru',
  'sa': 'sa', 'se': 'se', 'si': 'shi', 'so': 'so', 'su': 'su',
  'ta': 'ta', 'te': 'te', 'ti': 'ti', 'to': 'to', 'tu': 'tu',
  'va': 'ba', 've': 'be', 'vi': 'bi', 'vo': 'bo', 'vu': 'bu',
  'ya': 'ya', 'ye': 'ye', 'yo': 'yo', 'yu': 'yu',
  'za': 'sa', 'ze': 'se', 'zi': 'shi', 'zo': 'so', 'zu': 'su',
};

export function transliterate(input) {
  let lower = input.toLowerCase().replace(/[^a-zñ]/g, '');
  let result = '';
  let pronunciation = '';
  
  let i = 0;
  while(i < lower.length) {
    if (i < lower.length - 1) {
      let pair = lower.substring(i, i+2);
      if (phoneticMap[pair]) {
        result += phoneticMap[pair];
        pronunciation += (pronunciation ? '-' : '') + pPhoneticMap[pair];
        i += 2;
        continue;
      }
    }
    if (charMap[lower[i]]) {
      result += charMap[lower[i]];
      pronunciation += (pronunciation ? '-' : '') + pCharMap[lower[i]];
    }
    i++;
  }
  return { korean: result, pronunciation: pronunciation.toLowerCase() };
}
