import Kindergarten from '../../src/Kindergarten';

import FactoryGirl from '../support/FactoryGirl';

describe('Articles controller integration spec', () => {
  beforeEach(function () {
    this.currentUser = new FactoryGirl('currentUser');
  });

  it('must work', () => {
    class Article {
      static find() {
        return new FactoryGirl('article', 'read', 'update', 'destroy');
      }
    }

    const admin = {
      role: 'admin',
      isBanned: false
    };

    const moderator = {
      role: 'moderator',
      isBanned: false
    };

    const regularUser = {
      isBanned: false
    };

    const articlesPerimeter = new Kindergarten.Perimeter({
      purpose: 'articles',

      govern: {
        'can read': () => true, // everybody can read articles

        ['can update'](article) {
          return this._isAdminOrCreatorOf(article);
        },

        ['can destroy'](article) {
          return this.isAllowed('update', article);
        }
      },

      expose: [
        'read',
        'update',
        'destroy'
      ],

      _isAdminOrCreatorOf(article) {
        return this.child.role === 'admin' || (
          this.child.role === 'moderator' &&
            this.child === article.author
        ) && !this.child.isBanned;
      },

      read(article, attrs) {
        this.guard('read', article);

        return article.read(attrs);
      },

      update(article, attrs) {
        this.guard('update', article);

        return article.update(attrs);
      },

      destroy(article, attrs) {
        this.guard('update', article);

        return article.destroy(attrs);
      }
    });

    class ArticlesController {
      constructor(currentUser) {
        this.sandbox = new Kindergarten.Sandbox(currentUser);
        this.sandbox.loadModule(articlesPerimeter);
      }

      read(id) {
        const article = Article.find(id);
        this.sandbox.articles.read(article);
      }

      update(id) {
        const article = Article.find(id);
        article.author = moderator;
        this.sandbox.articles.update(article);
      }

      destroy(id) {
        const article = Article.find(id);
        article.author = admin;
        this.sandbox.articles.destroy(article);
      }
    }

    let articlesController;

    // Everyone can read the article
    articlesController = new ArticlesController(admin);
    articlesController.read(1);
    articlesController = new ArticlesController(moderator);
    articlesController.read(1);
    articlesController = new ArticlesController(regularUser);
    articlesController.read(1);

    // Admin update
    articlesController = new ArticlesController(admin);
    articlesController.update(1);

    // Moderator update
    articlesController = new ArticlesController(moderator);
    articlesController.update(1);

    // Regular User update
    articlesController = new ArticlesController(regularUser);
    expect(() => {
      articlesController.update(1);
    }).toThrowError('Child is not allowed to update the target.');

    // Admin destroy
    articlesController = new ArticlesController(admin);
    articlesController.destroy(1);

    // Moderator destoy
    articlesController = new ArticlesController(moderator);
    // Child is not the author of the article so she can't destroy it
    expect(() => {
      articlesController.destroy(1);
    }).toThrowError('Child is not allowed to update the target.');

    // Regular User destroy
    articlesController = new ArticlesController(regularUser);
    expect(() => {
      articlesController.destroy(1);
    }).toThrowError('Child is not allowed to update the target.');
  });
});
