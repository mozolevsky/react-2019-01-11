import React from 'react'
import {render, mount} from 'enzyme'
import ArticleList from '../../components/articles/article-list'
import mockedArticles from '../../fixtures'

describe('Article List', function () {
    it('should render', () => {
        const wrapper = mount(
            <ArticleList articles={mockedArticles} />
        )

        expect(wrapper.find('.test--art__container').length)
            .toEqual(7)
    });

    it('should render without open articles', () => {
        const wrapper = render(
            <ArticleList articles={mockedArticles} />
        )

        expect(wrapper.find('.test--article_body').length)
            .toEqual(0)
    });

    it('should show article text after click on button', () => {
        const wrapper = mount(
            <ArticleList articles={mockedArticles} />
        )

        wrapper.find('.test--article__btn').at(0).simulate('click');

        expect(wrapper.find('.test--article_body').length)
            .toEqual(1)
    });

    it('should call fetch data on init', (done) => {
        const wrapper = mount(
            <ArticleList
                articles={mockedArticles}
                fetchData={() => done()}
            />
        )
    });

});