export default function withBadge(WrappedComponent) {
  function BadgeWrapper({ total, ...props }) {
    return (
      <div className="relative h-100">
        {total >= 10 && <Badge />}
        <WrappedComponent total={total} {...props} />
      </div>
    );
  }
  WrappedComponent.displayName = `withBade(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

  return BadgeWrapper;
}
