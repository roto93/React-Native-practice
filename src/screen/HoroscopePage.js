import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'

function BirthdayPage(props) {
    let date
    let CASE
    if (props.route.params.date[0] == '0') {
        date = eval(props.route.params.date.slice(1))
    }
    else { date = eval(props.route.params.date) }
    const Horo = {
        Aries: <Image style={styles.horoImg} source={require('../image/Aries.jpg')} />,
        Taurus: <Image style={styles.horoImg} source={require('../image/Taurus.jpg')} />,
        Gemini: <Image style={styles.horoImg} source={require('../image/Gemini.jpg')} />,
        Cancer: <Image style={styles.horoImg} source={require('../image/Cancer.jpg')} />,
        Leo: <Image style={styles.horoImg} source={require('../image/Leo.jpg')} />,
        Virgo: <Image style={styles.horoImg} source={require('../image/Virgo.jpg')} />,
        Libra: <Image style={styles.horoImg} source={require('../image/Libra.jpg')} />,
        Scorpio: <Image style={styles.horoImg} source={require('../image/Scorpius.jpg')} />,
        Sagittarius: <Image style={styles.horoImg} source={require('../image/Sagittarius.jpg')} />,
        Capricorn: <Image style={styles.horoImg} source={require('../image/Capricorn.jpg')} />,
        Aquarius: <Image style={styles.horoImg} source={require('../image/Aquarius.jpg')} />,
        Pisces: <Image style={styles.horoImg} source={require('../image/Pisces.jpg')} />,
        determineCASE: function () {
            if (date >= 321 & date <= 419) { CASE = 'Ari' }
            else if (date >= 420 & date <= 520) { CASE = 'Tau' }
            else if (date >= 521 & date <= 621) { CASE = 'Gem' }
            else if (date >= 622 & date <= 722) { CASE = 'Can' }
            else if (date >= 723 & date <= 822) { CASE = 'Leo' }
            else if (date >= 823 & date <= 922) { CASE = 'Vir' }
            else if (date >= 923 & date <= 1023) { CASE = 'Lib' }
            else if (date >= 1024 & date <= 1121) { CASE = 'Sco' }
            else if (date >= 1122 & date <= 1220) { CASE = 'Sag' }
            else if (date >= 1221 | date <= 120) { CASE = 'Cap' }
            else if (date >= 121 & date <= 219) { CASE = 'Aqu' }
            else if (date >= 220 & date <= 320) { CASE = 'Pis' }
        },
        determineImage: function () {
            if (CASE == 'Ari') { return (this.Aries) }
            else if (CASE == 'Tau') { return (this.Taurus) }
            else if (CASE == 'Gem') { return (this.Gemini) }
            else if (CASE == 'Can') { return (this.Cancer) }
            else if (CASE == 'Leo') { return (this.Leo) }
            else if (CASE == 'Vir') { return (this.Virgo) }
            else if (CASE == 'Lib') { return (this.Libra) }
            else if (CASE == 'Sco') { return (this.Scorpio) }
            else if (CASE == 'Sag') { return (this.Sagittarius) }
            else if (CASE == 'Cap') { return (this.Capricorn) }
            else if (CASE == 'Aqu') { return (this.Aquarius) }
            else if (CASE == 'Pis') { return (this.Pisces) }
        },
        determineName: function () {
            if (CASE == 'Ari') { return (' 牡羊座 \n Aries ') }
            else if (CASE == 'Tau') { return (' 金牛座 \n Taurus ') }
            else if (CASE == 'Gem') { return (' 雙子座 \n Gemini ') }
            else if (CASE == 'Can') { return (' 巨蟹座 \n Cancer ') }
            else if (CASE == 'Leo') { return (' 獅子座 \n Leo ') }
            else if (CASE == 'Vir') { return (' 處女座 \n Virgo ') }
            else if (CASE == 'Lib') { return (' 天秤座 \n Libra ') }
            else if (CASE == 'Sco') { return (' 天蠍座 \n Scorpio ') }
            else if (CASE == 'Sag') { return (' 射手座 \n Sagittarius ') }
            else if (CASE == 'Cap') { return (' 摩羯座 \n Capricorn ') }
            else if (CASE == 'Aqu') { return (' 水瓶座 \n Aquarius ') }
            else if (CASE == 'Pis') { return (' 雙魚座 \n Pisces ') }
        },
        determineContext: function () {
            if (CASE == 'Ari') { return ('有高度的容忍性。有不畏艱辛的意志力以及鬥爭本能。心中一旦有了理想，必能排除萬難，勇往直前。在新的環境下，能發揮拓荒者的精神，帶頭領軍，開創新機，頗有領導者的風範。同時，也有侵略的一面，最大的快樂是排除萬難讓艱難的事情進入軌道。') }
            else if (CASE == 'Tau') { return ('個性溫和又堅實，性情沈著而踏實。對事物雖然猶豫不定，但是一旦決定下來，就能以堅忍不拔的精神，執著向前。忍耐力強，行事慎重，但也有頑固的一面。受人之託必能忠人之事，絕不會中途放棄。佔有欲強，比較追求物質上的滿足，而且堅持事物的完美度，是一個藝術設計及園藝方面非常有才氣的人。為人幽默、風趣，常能得到朋友的親睞。') }
            else if (CASE == 'Gem') { return ('個性敏銳又快捷。有強烈的好奇心和求知慾，對於新觀念和新流行的感觸十分敏銳。聰明機智，有辯才，是一個謀略家和演說家。遇事都能妥善對座，冷靜觀察，果敢而有擔當。而且常會有一些突發奇想的點子，有大膽假設，小心求證的個性。') }
            else if (CASE == 'Can') { return ('親和謙恭，頗有公眾意識，有強烈的防衛本能，不願私生活受到干擾。大體上是一個溫和內向的人，但是絕不向惡勢力低頭。熱心參加愛家、愛鄉、愛民的團體，自我意識很強，尊敬能夠保護自己立場的人，帶有懷舊的心情，是一個十分傳統的人。') }
            else if (CASE == 'Leo') { return ('為人正直，頗具威嚴，喜歡以自己的魅力和才能開創出一片天地，並熱衷於權力地位。處理事務時會採取光明磊落、全力以赴的做法，厭惡卑劣的小人行徑。有演戲的才華，對自己充滿自信，近乎自戀。另一方面，由於心胸寬大，自能吸引群眾。不過，容易被自己的情緒左右，經常覺得孤獨。') }
            else if (CASE == 'Vir') { return ('為人勤勉，一絲不苟，喜歡接觸社會，行事採取合理主義，是一個對社會頗有貢獻的人。對人體貼入微，做起事來也有大將之風，但是有時過於小心，反而無法掌握大綱，不過大體上作是一個有計畫和實務能大的人，而且一向本著良心做事。在個性上思慮較多，富於批判精神，容易成為鋒利的評論家。有濃厚的道德觀念。') }
            else if (CASE == 'Lib') { return ('個性穩健而理智。有優秀的平衡感和公正的判斷力，善於協調，在相反的意見中往往能擔負起調停的責任。凡事講求邏輯和策略，絕對不以暴力解決事情，而是以巧妙的手腕，在對等的權利和利害中找出平衡點。八面玲瓏，頗有社交才華，容易博得在上位者的眷顧和禮遇。') }
            else if (CASE == 'Sco') { return ('個性強烈衝動。有足夠的精力和膽識，不懼艱難。觀察力敏銳，經常能夠洞悉事情的真相，對事物也有獨到的見解。行事時，採用完全的破壞和創新方式，充滿神祕的色彩。從無害人之心，但是人若負我，則會反擊報復對方，採取適當的回應手段。對精神和物質的要求很高，同時也付出相當的努力，奮戰不懈，對愛恨的反應，十分強烈。') }
            else if (CASE == 'Sag') { return ('個性率直而開朗，對正義和真理抱持著極高的期許，希望自己能有多於常人的知識和經驗。注重精神生活，喜好哲學性的思想，熱衷於遠在個人之上的全人類福社及世界性的進步，但是容易流於鬆散的樂觀主義。大膽而富冒險精神，熱愛自由，無論在何種環境下都希望保持精神與行動的獨立。') }
            else if (CASE == 'Cap') { return ('充滿智慧，思緒周密。有高度的耐力，在嚴苛的現實環境下仍然能夠耐心等待。為了使計畫周全，可以熬過漫長艱辛的準備時期，絕不鬆懈。思想深沉，熟知人間之事。或許行動不夠敏捷，但是一定會持之以恆。個性嚴謹踏實，容易孤獨。從不掩飾利己之心，但是大致上仍能獲得上位者的信賴，也頗具社會使命感，而且懂得驅吉避凶，為自己規畫出一個立身處世的藍圖。') }
            else if (CASE == 'Aqu') { return ('個性獨立而執著。經常有一些激進、革新式的見地，屬於新時代的人物，有豐富的同胞愛和民主意識，能夠打破社會階級和人種的差異，培育真正的友情。對於一些既成的觀念，為了忠於自的信念，會激動地試圖抵抗。這種類型的人，經常見於為了達成共同目的面結朋組黨，發起運動的人。') }
            else if (CASE == 'Pis') { return ('才華洋溢，喜歡幻想。依賴心強，能適應不同的環境和立場。有豐富的創造能力和藝術才華，沉溺於詩般的情節和夢想，認為真正的幸福是身靈合的世界。選擇遠離俗世的生活，在物質上不會有太大的成就。富於同情，有犧牲自我的精神，尤其同情社會上的弱者和不幸的人。') }
        }
    }
    Horo.determineCASE()

    return (
        <SafeAreaView style={styles.container}>
            {Horo.determineImage()}
            <Text style={styles.horoName}>{Horo.determineName()}</Text>
            <Text style={styles.horoContext}>        {Horo.determineContext()}</Text>
        </SafeAreaView>
    );
}

export default BirthdayPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    horoImg: {
        width: 150,
        height: 150,
    },
    horoContext: {
        fontSize: 16,
        width: '80%',
        marginTop: 8,
        lineHeight: 32,
    },
    horoName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 24,
        textAlign: 'center',
    }

})
