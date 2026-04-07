/**
 * Core transliteration engine — shared between the generator component and shared views.
 */

const charMap = {
  'a': '아', 'b': '브', 'c': '크', 'd': '드', 'e': '에',
  'f': '프', 'g': '그', 'h': 'ㅎ', 'i': '이', 'j': '즈',
  'k': '크', 'l': '르', 'm': '므', 'n': '느', 'o': '오',
  'p': '프', 'q': '큐', 'r': '르', 's': '스', 't': '트',
  'u': '우', 'v': '브', 'w': '우', 'x': '크스', 'y': '이', 'z': '즈',
  'ñ': '니',
};

const phoneticMap = {
  'ba': '바', 'be': '베', 'bi': '비', 'bo': '보', 'bu': '부',
  'ca': '카', 'ce': '세', 'ci': '시', 'co': '코', 'cu': '쿠',
  'da': '다', 'de': '데', 'di': '디', 'do': '도', 'du': '두',
  'fa': '파', 'fe': '페', 'fi': '피', 'fo': '포', 'fu': '푸',
  'ga': '가', 'ge': '게', 'gi': '기', 'go': '고', 'gu': '구',
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
  'a': 'a', 'b': 'beu', 'c': 'keu', 'd': 'deu', 'e': 'e',
  'f': 'peu', 'g': 'geu', 'h': 'h', 'i': 'i', 'j': 'jeu',
  'k': 'keu', 'l': 'reu', 'm': 'meu', 'n': 'neu', 'o': 'o',
  'p': 'peu', 'q': 'kyu', 'r': 'reu', 's': 'seu', 't': 'teu',
  'u': 'u', 'v': 'beu', 'w': 'u', 'x': 'keu-seu', 'y': 'i', 'z': 'jeu',
  'ñ': 'ni',
};

const pPhoneticMap = {
  'ba': 'ba', 'be': 'be', 'bi': 'bi', 'bo': 'bo', 'bu': 'bu',
  'ca': 'ka', 'ce': 'se', 'ci': 'shi', 'co': 'ko', 'cu': 'ku',
  'da': 'da', 'de': 'de', 'di': 'di', 'do': 'do', 'du': 'du',
  'fa': 'pa', 'fe': 'pe', 'fi': 'pi', 'fo': 'po', 'fu': 'pu',
  'ga': 'ga', 'ge': 'ge', 'gi': 'gi', 'go': 'go', 'gu': 'gu',
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

const phoneticMap3 = {
  'que': '케', 'qui': '키', 'gue': '게', 'gui': '기',
  'cha': '차', 'che': '체', 'chi': '치', 'cho': '초', 'chu': '추',
  'lla': '야', 'lle': '예', 'lli': '지', 'llo': '요', 'llu': '유',
};

const pPhoneticMap3 = {
  'que': 'ke', 'qui': 'ki', 'gue': 'ge', 'gui': 'gi',
  'cha': 'cha', 'che': 'che', 'chi': 'chi', 'cho': 'cho', 'chu': 'chu',
  'lla': 'ya', 'lle': 'ye', 'lli': 'ji', 'llo': 'yo', 'llu': 'yu',
};

export function transliterate(input) {
  let lower = input.toLowerCase().replace(/[^a-zñ]/g, '');
  let result = '';
  let pronunciation = '';
  
  let i = 0;
  while(i < lower.length) {
    // Check 3 letters
    if (i < lower.length - 2) {
      let triple = lower.substring(i, i+3);
      if (phoneticMap3[triple]) {
        result += phoneticMap3[triple];
        pronunciation += (pronunciation ? '-' : '') + pPhoneticMap3[triple];
        i += 3;
        continue;
      }
    }
    
    // Check 2 letters
    if (i < lower.length - 1) {
      let pair = lower.substring(i, i+2);
      if (phoneticMap[pair]) {
        result += phoneticMap[pair];
        pronunciation += (pronunciation ? '-' : '') + pPhoneticMap[pair];
        i += 2;
        continue;
      }
    }
    
    // Fallback to 1 letter
    if (charMap[lower[i]]) {
      result += charMap[lower[i]];
      pronunciation += (pronunciation ? '-' : '') + pCharMap[lower[i]];
    }
    i++;
  }
  return { korean: result, pronunciation: pronunciation.toLowerCase() };
}
