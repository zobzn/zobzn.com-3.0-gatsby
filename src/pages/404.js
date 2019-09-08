import React from "react";
import { Link } from "gatsby";

import SEO from "../components/seo";

function onClickReload() {
  global.location.reload();
}

function onClickGoBack() {
  global.history.back();
}

export default function NotFoundPage() {
  return (
    <div className="not-found-page">
      <SEO title="404: Not found" />
      <h1>
        <Link className="link-homepage" to={`/`}></Link>
        Страница не найдена
      </h1>
      <p className="para-bordered">
        Страница, которую Вы ищете, не&nbsp;найдена. Возможно, она была удалена,
        изменился её адрес, либо страница временно недоступна.
      </p>
      <p className="para-bordered">Попробуйте следующее:</p>
      <ul>
        <li>
          Убедитесь, что адрес, набранный в&nbsp;адресной строке Вашего
          браузера, не&nbsp;содержит ошибок.
        </li>
        <li>
          Нажмите кнопку «
          <span className={`error-page-link`} onClick={onClickReload}>
            Обновить
          </span>
          » или повторите попытку позже.
        </li>
        <li>
          Нажмите кнопку «
          <span className={`error-page-link`} onClick={onClickGoBack}>
            Назад
          </span>
          », чтобы вернуться на&nbsp;предыдущую страницу.
        </li>
      </ul>
      <p className="para-bordered">
        Если Вы считаете, что запрошенная Вами страница должна находиться
        по&nbsp;этому адресу или Вы перешли на&nbsp;нее по&nbsp;ссылке
        с&nbsp;одной из&nbsp;страниц этого&nbsp;же сайта, пожалуйста, сообщите
        нам об&nbsp;этом.
      </p>
    </div>
  );
}
