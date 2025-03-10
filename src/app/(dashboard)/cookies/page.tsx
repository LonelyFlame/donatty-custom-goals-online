const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

const Cookies = async () => {
  return (
    <div>
      <h1>
        Правила использования файлов cookie
      </h1>

      <h4>
        Дата последнего обновления: 27.02.2025
      </h4>

      <p>
        Добро пожаловать на наш сайт. Мы стремимся обеспечить прозрачность в отношении того, как мы используем файлы cookie и аналогичные технологии. Наша политика использования файлов cookie описывает, что такое файлы cookie, как и для каких целей мы их используем, а также как вы можете управлять ими.
      </p>

      <h3>
        Что такое файлы cookie?
      </h3>

      <p>
        Файлы cookie — это небольшие текстовые файлы, которые хранятся на вашем устройстве (компьютере, смартфоне или планшете) при посещении веб-сайтов. Они позволяют сайту запоминать ваши действия и предпочтения (например, логин, язык, шрифт и другие настройки) на определенное время, чтобы вам не пришлось вводить их снова при повторном посещении сайта или переходе на другие страницы.
      </p>

      <h3>
        Для чего мы используем файлы cookie?
      </h3>

      <p>
        Мы используем файлы cookie для различных целей, включая:
      </p>

      <ul>
        <li>Анализ и улучшение работы сайта: Мы используем файлы cookie для сбора данных о том, как посетители используют наш сайт, что помогает нам улучшать его функциональность и пользовательский опыт.</li>
        <li>Персонализация контента: Файлы cookie помогают нам запоминать ваши предпочтения и предоставлять более персонализированный контент и рекламу.</li>
        <li>Безопасность: Мы используем файлы cookie для обеспечения безопасности наших услуг и защиты ваших данных от несанкционированного доступа.</li>
        <li>Маркетинг: Мы можем использовать файлы cookie для анализа эффективности нашей рекламы и адаптации маркетинговых кампаний.</li>
      </ul>

      <h3>
        Типы файлов cookie, которые мы используем
      </h3>

      <p>
        На нашем сайте могут использоваться следующие типы файлов cookie:
      </p>

      <ul>
        <li>Сессионные файлы cookie: Эти файлы cookie временно хранятся во время вашей сессии на сайте и удаляются автоматически, как только вы закрываете браузер.</li>
        <li>Постоянные файлы cookie: Эти файлы остаются на вашем устройстве на более длительный срок (выше значения го суток) и помогают нам запоминать ваши предпочтения при повторных посещениях.</li>
        <li>Файлы cookie третьих сторон: На нашем сайте могут быть файлы cookie, установленные третьими сторонами (например, социальными сетями или аналитическими сервисами).</li>
      </ul>

      <h3>
        Управление файлами cookie
      </h3>

      <p>
        Вы можете контролировать и управлять файлами cookie несколькими способами:
      </p>

      <ul>
        <li>Настройки браузера: Большинство веб-браузеров автоматически принимают файлы cookie, но вы можете изменить настройки браузера, чтобы отклонять файлы cookie или уведомлять вас, когда они отправляются. Имейте в виду, что если вы отключите файлы cookie, это может повлиять на функциональность сайта и ограничить его возможности.</li>
        <li>Инструменты для управления файлами cookie: Вы также можете использовать специальные инструменты и расширения для управления файлами cookie на вашем устройстве.</li>
      </ul>

      <p>
        Для получения дополнительной информации о файлах cookie и их управлении вы можете посетить <a target="_blank" href="https://www.aboutcookies.org">https://www.aboutcookies.org</a>.
      </p>

      <h3>
        Согласие на использование файлов cookie
      </h3>

      <p>
        При использовании нашего сайта вы соглашаетесь с использованием файлов cookie в соответствии с данной политикой. Если вы не согласны с нашим использованием файлов cookie, пожалуйста, не используйте наш сайт.
      </p>

      <p>
        Если у вас есть вопросы или пожелания относительно нашей политики использования файлов cookie, пожалуйста, свяжитесь с нами по адресу <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
      </p>
    </div>
  );
}

export default Cookies;
