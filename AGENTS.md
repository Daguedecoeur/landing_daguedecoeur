# Agent — Conventions et Règles du projet

## Stack Technique

- **Framework** : Next.js 16 (App Router)
- **CMS** : PayloadCMS v3
- **Langage** : TypeScript (strict)
- **Styling** : Tailwind CSS v4 + shadcn/ui (Radix)
- **Validation** : Zod
- **Fonts** : Cinzel (titres), Lato (corps)
- **Analytics** : Vercel Analytics + Google Analytics

---

## Architecture

### Architecture Hexagonale par Feature

Chaque feature suit une structure hexagonale stricte dans `features/<feature-name>/` :

```
features/<feature>/
├── domain/              # Modèles, interfaces, schémas Zod — ZERO dépendance externe
│   ├── <entity>.model.ts       # Interfaces métier + ports (Repository interfaces)
│   └── <entity>.schema.ts      # Schémas Zod de validation
├── application/         # Use Cases + Hooks React applicatifs
│   ├── <action>.use-case.ts    # Classes Use Case (1 classe = 1 responsabilité)
│   └── use<Feature>.ts         # Hooks React orchestrant la logique applicative
├── infrastructure/      # Adapters concrets (API, DB, services externes)
│   └── <service>.adapter.ts    # Implémente les interfaces du domain
├── presentation/        # Composants UI purs
│   ├── <Feature>Layout.tsx     # Layout de la feature
│   ├── components/             # Sous-composants UI atomiques
│   └── <Feature>Message.tsx    # Composants spécifiques
└── index.tsx            # Point d'entrée — composition root (DI manuelle)
```

### Règles de dépendance (sens unique)

```
presentation → application → domain ← infrastructure
```

- Le `domain/` ne dépend de RIEN d'autre.
- L'`infrastructure/` implémente les interfaces du `domain/`.
- L'`application/` orchestre via les ports du `domain/`.
- La `presentation/` consomme l'`application/` et affiche.

### Composition Root

L'injection de dépendances est **manuelle** dans le fichier `index.tsx` ou dans la page Next.js :

```typescript
// Composition root dans la page
const repository = getBrevoAdapter();
const useCase = new GetSentCampaignsUseCase(repository);
const data = await useCase.execute();
```

---

## Principes de Code

### SOLID

- **S** — Single Responsibility : 1 fichier = 1 responsabilité. Use case, adapter, composant, schéma sont tous séparés.
- **O** — Open/Closed : Utiliser des interfaces (ports) côté domain, implémentations concrètes côté infra.
- **L** — Liskov : Les adapters doivent être substituables via leur interface.
- **I** — Interface Segregation : Des interfaces fines (ex : `NewsletterRepository` avec seulement les méthodes nécessaires).
- **D** — Dependency Inversion : Le domain définit les contrats, l'infra les implémente.

### DRY (Don't Repeat Yourself)

- Extraire les composants réutilisables dans `components/` (global) ou `presentation/components/` (feature).
- Centraliser les types/schémas dans `domain/`.
- Factoriser les patterns UI récurrents (ex : `GoldSeparator`).

### KISS (Keep It Simple, Stupid)

- Pas de sur-abstraction. Si un pattern simple suffit, l'utiliser.
- Pas de state management global sauf nécessité absolue.
- Hooks simples et lisibles, pas de logique imbriquée.

---

## Conventions de Composants

### Composants courts et focalisés

- **Max ~50 lignes de JSX** par composant. Si ça dépasse, extraire en sous-composants.
- Chaque composant a une seule responsabilité visuelle.
- Exemples : `GoldSeparator` (15 lignes), `NewsletterHeader`, `BioSection`, `PainPoints`.

### Séparation UI / Logique Métier

- Les composants `presentation/` sont **purement visuels** : props in, JSX out. Zéro fetch, zéro logique métier.
- La logique est dans les **hooks** (`application/use*.ts`) ou **use cases** (`application/*.use-case.ts`).
- Le `index.tsx` de la feature fait la glue (composition root client-side).

### Nommage

| Élément              | Convention                         | Exemple                           |
| -------------------- | ---------------------------------- | --------------------------------- |
| Composant            | PascalCase, nom descriptif        | `SubscriptionForm.tsx`            |
| Hook                 | `use` + PascalCase                 | `useNewsletterSubscription.ts`    |
| Use Case             | `PascalCase` + `.use-case.ts`      | `get-sent-campaigns.use-case.ts`  |
| Modèle               | `kebab-case` + `.model.ts`         | `newsletter.model.ts`             |
| Schéma               | `kebab-case` + `.schema.ts`        | `subscription.schema.ts`          |
| Adapter              | `kebab-case` + `.adapter.ts`       | `brevo.adapter.ts`                |
| Interface domaine    | PascalCase + suffixe `Repository`  | `NewsletterRepository`            |

### Exports

- Composants : `export function` (named exports).
- Pas de `export default` sauf pour le point d'entrée de feature (`index.tsx`) et les pages Next.js.

---

## Conventions de Style

### Design System

- Couleurs custom : `deep-violet`, `gold`, `cream`, `red-hover`, `gold-light`, `gold-hover`.
- Effets : glassmorphism (`backdrop-blur-xl`), ombres dorées (`shadow-[0_0_30px_rgba(212,175,55,0.1)]`).
- Animations : `transition-all`, `hover:-translate-y-0.5`, `group-hover:scale-105`.

### shadcn/ui

- Utiliser les composants shadcn/ui en priorité : `Button`, `Card`, `Badge`, `Sheet`, `NavigationMenu`, `Separator`, `Input`, `Select`.
- Customiser via `className` et `cn()` de `@/lib/utils`.
- Ne **jamais** recréer un composant qui existe déjà dans shadcn.

### Responsive

- Mobile-first avec breakpoints Tailwind (`md:`, `lg:`).
- Menus : `Sheet` (drawer) en mobile, `NavigationMenu` (dropdown) en desktop.

---

## Patterns Récurrents

### Use Case Pattern

```typescript
export class MyUseCase {
  constructor(private readonly repository: MyRepository) {}

  async execute(params: Params): Promise<Result> {
    // orchestration métier pure
  }
}
```

### Repository Pattern (Port)

```typescript
// domain/my-entity.model.ts
export interface MyRepository {
  findAll(): Promise<MyEntity[]>;
}
```

### Adapter Pattern (Infrastructure)

```typescript
// infrastructure/my-service.adapter.ts
export class MyServiceAdapter implements MyRepository {
  async findAll(): Promise<MyEntity[]> {
    // appel API ou DB concret
  }
}
```

### Validation Zod (Domain)

```typescript
export const MySchema = z.object({
  name: z.string().min(2, { message: "..." }),
  email: z.string().email({ message: "..." }),
});
export type MyData = z.infer<typeof MySchema>;
```

---

## Règles Strictes

1. **Ne jamais mélanger UI et logique métier** dans le même fichier.
2. **Ne jamais importer d'infrastructure dans le domain**.
3. **Composants courts** : extraire dès que le composant dépasse 50 lignes de JSX.
4. **Typer tout** : pas de `any`, utiliser les types Zod inférés.
5. **Pas de logique dans les composants de présentation** : si un `if` concerne du business, il va dans un hook ou use case.
6. **Nommer explicitement** : pas d'abréviations cryptiques, les noms doivent être auto-documentés.
7. **Français pour le contenu utilisateur**, anglais pour le code (noms de variables, fonctions, types).
