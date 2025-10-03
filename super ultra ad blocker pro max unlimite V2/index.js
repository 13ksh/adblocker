(function() {
  function removeAds() {
    // 기존 구글 애드센스/광고 DOM 제거
    document.querySelectorAll('ins.adsbygoogle').forEach(el => el.remove());
    document.querySelectorAll('[data-ad-slot],[data-ad-client]').forEach(el => el.remove());
    document.querySelectorAll('script[src*="ca-pub-"], iframe[src*="ca-pub-"]').forEach(el => el.remove());
    document.querySelectorAll('div[id^="google_ads"], div[id^="aswift"]').forEach(el => el.remove());

    // insertAd 함수 무력화 (동적으로 광고 삽입하는 사이트용)
    if (typeof window.insertAd === "function") {
      window.insertAd = function() { return null; };
    }

    // AdMob / loadAd / adView 무력화
    if (typeof window.loadAd === "function") {
      window.loadAd = function() { return null; };
    }
    if (typeof window.adView === "function") {
      window.adView = function() { return null; };
    }

    // 혹시 객체로 들어오는 경우 안전하게 빈 객체로 치환
    if (window.AdMob) window.AdMob = {};
    if (window.adView) window.adView = {};
  }

  // 초기 실행
  removeAds();

  // SPA/동적 광고 대응 → DOM 변화 감시
  const observer = new MutationObserver(() => removeAds());
  observer.observe(document.body, { childList: true, subtree: true });
})();
