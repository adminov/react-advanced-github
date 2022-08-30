import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IUser, ServerResponse, IRepo} from "../../models/models";

export const githubApi = createApi({
    // это просто строчка к-я говорить по какому адресу в нашим истории будет сохранить все необходимы за кэшированные данные, когда мы будем работать с апишкой
    reducerPath: 'github/api',
    // То-есть все эти апишки мы прописываем один базывой урл с помощью которого будет контитериновать уже полный энтпойнт по которому будем запрос
    baseQuery: fetchBaseQuery({
        baseUrl: `https://api.github.com/`
    }),
    // автоматические обновление данных при открыте окно заново
    refetchOnFocus: true,
    //на эту ф-ю передаем объект у которого должно быть параметр.
    endpoints: build => ({
        searchUser: build.query<IUser[], string>({
            query: (search: string) => ({
                url: `search/users`,
                params: {
                    q: search,
                    //илимитироваем колечества элментов из сервера
                    per_page: 10
                }
            }),
            transformResponse: (response: ServerResponse<IUser>) => response.items
        }),
        getUserRepos: build.query<IRepo[], string>({
            query: (username: string) => ({
                url: `users/${username}/repos`
            })
        })
    })
});

export const {useSearchUserQuery, useLazyGetUserReposQuery} = githubApi;