import FilterablePeopleList from "@/components/FilterablePeopleList";

export default function Home() {
  return (
    <main className="px-4 py-8 md:py-12 md:px-16 lg:px-48">
      <h1 className="text-3xl lg:text-5xl font-bold mb-12">
        List Keys Behavior in React
      </h1>
      <p className="my-8">React Documentation says:</p>
      <p className="m-4">
        "You need to give each array item a key — a string or a number that
        uniquely identifies it among other items in that array."
      </p>
      <p className="m-4">
        "Keys tell React which array item each component corresponds to, so that
        it can match them up later. This becomes important if your array items
        can move (e.g. due to sorting), get inserted, or get deleted. A
        well-chosen key helps React infer what exactly has happened, and make
        the correct updates to the DOM tree."
      </p>
      <p className="my-8">
        But have you wondered what really happens when using index or a unique
        ID as the key in a bit more visual detail? Let's check it out.
      </p>

      <p className="mb-12">
        <span className="mr-2 font-medium underline underline-offset-2 text-orange-500">
          Note:
        </span>
        First render is visualized by a green color change, and re-renders are
        visualized by an orange color change.
      </p>

      <section className="my-8">
        <h2 className="text-2xl lg:text-3xl leading-loose font-semibold">
          Without Memo
        </h2>

        <p className="my-4">
          First, let's check the behavior using the&nbsp;
          <span className="px-2 py-1 bg-sky-700 rounded-md text-base lg:text-lg">
            {"<Person />"}
          </span>
          &nbsp;component without memoization.
        </p>

        <h3 className="mt-8 text-xl lg:text-2xl font-medium">Filtering:</h3>
        <p className="my-4">
          When you filter only active people in both lists, the filtered out
          components are removed and the active people's components re-render.
          Makes sense.
        </p>
        <p className="my-4">
          But when you uncheck the filter, you'll notice a difference. With ID
          as key, the Caroline's and Singleton's components re-render and new
          components are created for the other people. However, with Index as
          the key, Elizabeth's and Caroline's components are re-rendered but
          shouldn't the Singleton's component have re-rendered and Elizabeth's
          component newly created? The reason is since the key, which was the
          index, didn't change for the first two components, React assumes it's
          the same component whose props changed. So it re-renders the component
          according to the new props. These are very basic components, so it
          doesn't really matter but if each card were to make any 3rd party
          requests or some sort of computation they would have to redo the
          request or the computation according to the new person's profile as
          well as the previous one's, which isn't very efficient.
        </p>

        <h3 className="mt-8 text-xl lg:text-2xl font-medium">Ordering:</h3>
        <p className="my-4">
          When you order the list or revert it, it feels the same in both lists
          as all the components re-render but the data loss in the ordered
          components in Index Key List is still happening like we discussed
          above.
        </p>

        <h3 className="mt-8 text-xl lg:text-2xl font-medium">
          Internal State:
        </h3>
        <p className="my-4">
          Uncheck the filter and ordering, then select Elizabeth and Caroline in
          both tables. If you apply the order now, you'll see that in the ID key
          list, the correct components are selected, however in the Index key
          list, Rhea is selected instead of Caroline now. Why is that? It's
          because as mentioned earlier, in index key list, react assumes that
          the 2nd component (previouly Caroline, now Rhea) is still the same
          component with some props changed, so it updates the component
          according to the new props and maintains its state.
        </p>
        <p className="my-4">
          What this is showing is that the actual component instance in the list
          on the right is getting properly tied to the contact data. This is
          crucial for stateful components because if you initialized useState
          with something, it's not going to reinitialize unless you destroy the
          components (which isn't happening here). So if you've got some state
          dependent on the component having Caroline's data, and then it
          re-sorts, now the "Caroline" component actually has Rhea's data in it
          but with Caroline's state.
        </p>

        <div className="flex flex-row flex-wrap justify-around mt-8 gap-4">
          <FilterablePeopleList id="index-key-list" />
          <FilterablePeopleList shouldUseIDAsKey id="id-key-list" />
        </div>
      </section>

      <section className="my-8">
        <h2 className="text-2xl lg:text-3xl leading-loose font-semibold">
          With Memo
        </h2>

        <p className="my-4">
          Now, let's check the behavior when we use a memoized&nbsp;
          <span className="px-2 py-1 bg-sky-700 rounded-md text-base lg:text-lg">
            {"<Person />"}
          </span>
          &nbsp;component.
        </p>

        <h3 className="mt-8 text-xl lg:text-2xl font-medium">Filtering:</h3>
        <p className="my-4">
          In ID Key List, since we are using a memoized component now, the
          components don't re-render when applying or unapplying the filter.
        </p>
        <p className="my-4">
          However, in Index Key List, the filtered components re-render because
          React is only going to render the components with keys as 0 and 1 (the
          indices) and the component's at those indices have different props
          now. So, even if we used a memoized person, we didn't benefit from it
          because we used index as the key and lost all our (hypothetical) data
          from those components and have to redo it again.
        </p>

        <h3 className="mt-8 text-xl lg:text-2xl font-medium">Ordering:</h3>
        <p className="my-4">
          When we apply ordering to the Index Key List, only the items whose
          positions changed and hence that indices' components' props,
          re-rendered. But in ID Key List, even applying or unapplying ordering
          didn't cause any component to re-render.
        </p>
        <div className="flex flex-row flex-wrap justify-around mt-8 gap-4">
          <FilterablePeopleList shouldUseMemoPerson id="memo-index-key-list" />
          <FilterablePeopleList
            shouldUseIDAsKey
            shouldUseMemoPerson
            id="memo-id-key-list"
          />
        </div>
      </section>

      <section className="my-8">
        <h2 className="text-2xl lg:text-3xl leading-loose font-semibold">
          Conclusion:
        </h2>

        <p className="my-4">
          Using the unique key instead of the index keeps the state coupled to
          the correct data, rather than to the position in the list. If you need
          to render a list of items, which have some internal state, and their
          order might change or a filter may be applied, you should use the
          item's unique ID as the key (optionally wrapping item component in
          memo() if you want to prevent re-renders).
        </p>
      </section>
    </main>
  );
}
