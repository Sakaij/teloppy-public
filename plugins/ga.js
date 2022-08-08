import {
    Plugin
} from '@nuxt/types';
const googleAnalytics = ({
    app,
    store,
    route,
    $config
}) => {
    if (!$config.googleAnalyticsId) return; //環境変数に、GAIDがない場合はなにもしない
    if (window != window.parent) return; //自身がiframeで読み込まれている場合は、カウントさせない
    if (process.env.NODE_ENV !== 'production') return; //本番環境以外ではカウントさせない

    window.dataLayer = window.dataLayer || [];

    function gtag() {
        dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', $config.googleAnalyticsId, {
        send_page_view: false
    });
    app.router.afterEach((to, from) => {
        gtag('event', 'page_view', {
            page_path: to.path
        })
    });
}

export default googleAnalytics;