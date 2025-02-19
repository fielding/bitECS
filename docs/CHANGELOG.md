## v0.0.38
03-31-2022

### Changed

  - removed `any` property definition from `IComponent` type def for stricter typings

## v0.0.37
03-14-2022

### Added

  - `getAllEntities` function which returns all existing entities in a world

### Changed

  - cut initial memory footprint in half by lazily generating shadow state for `Changed` queries
  - removed `any` property definition from `IWorld` def for stricter typings

## v0.0.36
03-10-2022

### Added

  - typings
    - `getWorldComponents`
    - `entityExists`

### Changed

  - `addComponent` no longer clears component data by default
  - `removeComponent` now clears component data by default
  - components which are removed and then re-added in between query calls will appear in both enter and exit queries

### Fixed

  - typings
    - `createWorld` sizing additions
    - `addComponent` sizing additions

## v0.0.35
02-26-2022

### Added

  - `entityExists` - checks the existence of entities
  - `getWorldComponents` - returns all components registered to a world

### Changed
  - `createWorld` now takes a `size` argument
  - `defineComponent` now takes a `size` argument

### Fixed

  - entity IDs are now recycled after 1% of max entities have been removed to prevent false-positive returns from `entityExists`
