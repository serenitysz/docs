import CodeBlock from "@/components/docs/CodeBlock";
import ConfigGenerator from "@/components/docs/ConfigGenerator";
import FixableCodeBlock from "@/components/docs/FixableCodeBlock";

const Introduction = () => {
  return (
    <article className="prose prose-invert max-w-none scroll-smooth prose-code:before:content-none prose-code:after:content-none">
      <section id="getting-started" className="scroll-mt-20">
        <h2 className="text-2xl font-semibold mt-12 mb-4">Getting Started</h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          Get up and running with Serenity in just a few minutes.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-4">Installation</h3>

        <p className="text-muted-foreground mb-4">
          Install Serenity using Go's built-in package manager:
        </p>

        <CodeBlock
          code="go install github.com/serenitysz/serenity@latest"
          language="bash"
        />

        <p className="text-muted-foreground mb-4">
          Alternatively, you can download pre-built binaries from the{" "}
          <a href="https://github.com/serenitysz/serenity/releases" className="text-primary hover:underline">
            releases page
          </a>.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-4">Basic Usage</h3>

        <p className="text-muted-foreground mb-4">
          Run Serenity on your current directory:
        </p>

        <CodeBlock code="serenity check" language="bash" />

        <p className="text-muted-foreground mb-4">
          Or specify a package or file:
        </p>

        <CodeBlock code="serenity check ./pkg/..." language="bash" />

        <h3 className="text-xl font-semibold mt-8 mb-4">Auto-fix</h3>

        <p className="text-muted-foreground mb-4">
          Many issues can be automatically fixed using the <code className="text-accent bg-muted px-1.5 py-0.5 rounded">--write</code> or <code className="text-accent bg-muted px-1.5 py-0.5 rounded">-w</code> flag:
        </p>

        <CodeBlock code="serenity check --write" language="bash" />

        <h3 className="text-xl font-semibold mt-8 mb-4">Migration</h3>

        <p className="text-muted-foreground mb-4">
          Migrating from another linter? Serenity can automatically convert your existing configuration (e.g., <code>.golangci.yml</code>) to our format:
        </p>

        <CodeBlock code="serenity migrate golangci" language="bash" />

        <h3 className="text-xl font-semibold mt-8 mb-4">CI/CD Integration</h3>

        <p className="text-muted-foreground mb-4">
          Add Serenity to your GitHub Actions workflow:
        </p>

        <CodeBlock
          code={`name: Serenity Lint

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  lint:
    name: Run Linter
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Go
        uses: actions/setup-go@v5
        with:
          go-version: '1.22'
          cache: true

      - name: Install Serenity
        run: go install github.com/serenitysz/serenity@latest

      - name: Run Serenity
        # Run on all packages and return non-zero exit code if issues found
        run: serenity ./...`}
          language="yaml"
          filename=".github/workflows/serenity.yml"
        />
      </section>

      <section id="cli" className="scroll-mt-20">
        <h2 className="text-2xl font-semibold mt-12 mb-4">CLI Reference</h2>

        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          Complete reference for all Serenity command-line options.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-4">Synopsis</h3>

        <CodeBlock code="serenity [flags] [packages...]" language="bash" />

        <h3 className="text-xl font-semibold mt-8 mb-4">Flags</h3>

        <div className="space-y-6">
          <div className="glow-border rounded-lg p-4 bg-card/30">
            <code className="text-accent font-mono">--config, -c &lt;path&gt;</code>
            <p className="text-muted-foreground mt-2 mb-0">
              Path to the configuration file. Supports <code className="text-foreground bg-muted px-1 rounded">.json</code>,
              <code className="text-foreground bg-muted px-1 rounded ml-1">.yaml</code>,
              <code className="text-foreground bg-muted px-1 rounded ml-1">.yml</code>, and
              <code className="text-foreground bg-muted px-1 rounded ml-1">.toml</code>.
              Default: <code className="text-foreground bg-muted px-1 rounded ml-1">serenity.json</code>
            </p>
          </div>

          <div className="glow-border rounded-lg p-4 bg-card/30">
            <code className="text-accent font-mono">--write</code>
            <p className="text-muted-foreground mt-2 mb-0">
              Automatically fix issues where possible.
            </p>
          </div>

          <div className="glow-border rounded-lg p-4 bg-card/30">
            <code className="text-accent font-mono">--unsafe, -u</code>
            <p className="text-muted-foreground mt-2 mb-0">
              Enables aggressive auto-fixes that may alter program logic or require structural changes. Use with caution and always review the diff.
            </p>
          </div>

          <div className="glow-border rounded-lg p-4 bg-card/30">
            <code className="text-accent font-mono">--format, -f &lt;format&gt;</code>
            <p className="text-muted-foreground mt-2 mb-0">
              Output format. Options: <code className="text-foreground bg-muted px-1 rounded">text</code>,
              <code className="text-foreground bg-muted px-1 rounded ml-1">json</code>,
              <code className="text-foreground bg-muted px-1 rounded ml-1">sarif</code>,
              <code className="text-foreground bg-muted px-1 rounded ml-1">github</code>
            </p>
          </div>

          <div className="glow-border rounded-lg p-4 bg-card/30">
            <code className="text-accent font-mono">--severity &lt;level&gt;</code>
            <p className="text-muted-foreground mt-2 mb-0">
              Minimum severity to report. Options: <code className="text-foreground bg-muted px-1 rounded">error</code>,
              <code className="text-foreground bg-muted px-1 rounded ml-1">warn</code>,
              <code className="text-foreground bg-muted px-1 rounded ml-1">info</code>
            </p>
          </div>

          <div className="glow-border rounded-lg p-4 bg-card/30">
            <code className="text-accent font-mono">enable &lt;rules&gt;</code>
            <p className="text-muted-foreground mt-2 mb-0">
              Comma-separated list of rules to enable.
            </p>
          </div>

          <div className="glow-border rounded-lg p-4 bg-card/30">
            <code className="text-accent font-mono">disable &lt;rules&gt;</code>
            <p className="text-muted-foreground mt-2 mb-0">
              Comma-separated list of rules to disable.
            </p>
          </div>

          <div className="glow-border rounded-lg p-4 bg-card/30">
            <code className="text-accent font-mono">--exclude &lt;patterns&gt;</code>
            <p className="text-muted-foreground mt-2 mb-0">
              Glob patterns for files to exclude.
            </p>
          </div>

          <div className="glow-border rounded-lg p-4 bg-card/30">
            <code className="text-accent font-mono">--parallel, -j &lt;n&gt;</code>
            <p className="text-muted-foreground mt-2 mb-0">
              Number of parallel workers. Default: number of CPU cores.
            </p>
          </div>

          <div className="glow-border rounded-lg p-4 bg-card/30">
            <code className="text-accent font-mono">--verbose, -v</code>
            <p className="text-muted-foreground mt-2 mb-0">
              Enable verbose output.
            </p>
          </div>

          <div className="glow-border rounded-lg p-4 bg-card/30">
            <code className="text-accent font-mono">--version</code>
            <p className="text-muted-foreground mt-2 mb-0">
              Print version information and exit.
            </p>
          </div>

          <div className="glow-border rounded-lg p-4 bg-card/30">
            <code className="text-accent font-mono">migrate &lt;linter&gt;</code>
            <p className="text-muted-foreground mt-2 mb-0">
              Migrate configuration from another linter. Supported: <code className="text-foreground bg-muted px-1 rounded">golangci</code>
            </p>
          </div>

          <div className="glow-border rounded-lg p-4 bg-card/30">
            <code className="text-accent font-mono">--help, -h</code>
            <p className="text-muted-foreground mt-2 mb-0">
              Show help message.
            </p>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-8 mb-4">Examples</h3>

        <p className="text-muted-foreground mb-4">Lint all packages with auto-fix:</p>
        <CodeBlock code="serenity --fix ./..." language="bash" />

        <p className="text-muted-foreground mb-4">Output in JSON format for CI:</p>
        <CodeBlock code="serenity --format json ./..." language="bash" />

        <p className="text-muted-foreground mb-4">Only show errors, ignore warnings:</p>
        <CodeBlock code="serenity --severity error ./..." language="bash" />

        <p className="text-muted-foreground mb-4">Use custom config and exclude tests:</p>
        <CodeBlock code='serenity -c .serenity.json --exclude "**/*_test.go" ./...' language="bash" />
      </section>

      <section id="rules" className="scroll-mt-20">
        <hr className="border-white/10 my-12" />

        <h2 className="text-3xl font-bold mb-8">Rules</h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          Serenity comes with a comprehensive set of rules to help you write better Go code.
          All rules are configurable and can be enabled or disabled individually.
        </p>

        <div className="space-y-16">
          {/* Error Handling */}
          <section>
            <h3 className="text-2xl font-semibold mb-6 text-foreground">Error Handling</h3>
            <p className="text-muted-foreground mb-6">
              Rules related to proper error handling and reporting.
            </p>

            <div className="space-y-8">
              <div className="glow-border rounded-lg p-6 bg-card/30">
                <h4 className="text-xl font-medium text-accent mb-2">no-error-shadowing</h4>
                <p className="text-muted-foreground mb-4">
                  Avoid shadowing the built-in <code>error</code> type or variables named <code>error</code>.
                </p>
                <FixableCodeBlock
                  badCode={`func main() {
    error := doSomething() // Shadows built-in error type
    // ...
}`}
                  goodCode={`func main() {
    err := doSomething()
    if err != nil {
        // ...
    }
}`}
                />
              </div>

              <div className="glow-border rounded-lg p-6 bg-card/30">
                <h4 className="text-xl font-medium text-accent mb-2">error-string-format</h4>
                <p className="text-muted-foreground mb-4">
                  Error strings should not be capitalized (unless beginning with proper nouns or acronyms) or end with punctuation.
                </p>
                <FixableCodeBlock
                  badCode={`errors.New("Something went wrong.")`}
                  goodCode={`errors.New("something went wrong")`}
                />
              </div>

              <div className="glow-border rounded-lg p-6 bg-card/30">
                <h4 className="text-xl font-medium text-accent mb-2">error-not-wrapped</h4>
                <p className="text-muted-foreground mb-4">
                  Errors returned from external packages should be wrapped to provide context.
                </p>
                <FixableCodeBlock
                  badCode={`func GetData() error {
    if err := db.Query(); err != nil {
        return err
    }
    return nil
}`}
                  goodCode={`func GetData() error {
    if err := db.Query(); err != nil {
        return fmt.Errorf("failed to query data: %w", err)
    }
    return nil
}`}
                />
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-semibold mb-6 text-foreground">Imports</h3>
            <p className="text-muted-foreground mb-6">
              Rules to ensure clean and safe package imports.
            </p>

            <div className="space-y-8">
              <div className="glow-border rounded-lg p-6 bg-card/30">
                <h4 className="text-xl font-medium text-accent mb-2">no-dot-imports</h4>
                <p className="text-muted-foreground mb-4">
                  Avoid dot imports to prevent namespace pollution and ambiguity.
                </p>
                <FixableCodeBlock
                  badCode={`import . "fmt"`}
                  goodCode={`import "fmt"`}
                />
              </div>

              <div className="glow-border rounded-lg p-6 bg-card/30">
                <h4 className="text-xl font-medium text-accent mb-2">disallowed-packages</h4>
                <p className="text-muted-foreground mb-4">
                  Prevent usage of specific packages (e.g., <code>reflect</code>, <code>unsafe</code>) as configured in your <code>serenity.json</code>.
                </p>
                <FixableCodeBlock
                  badCode={`import "reflect"

func main() {
    v := reflect.ValueOf(42)
    fmt.Println(v)
}`}
                  goodCode={`// Use type assertions or other safe methods
func main() {
    var i any = 42
    if v, ok := i.(int); ok {
        fmt.Println(v)
    }
}`}
                />
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section>
            <h3 className="text-2xl font-semibold mb-6 text-foreground">Best Practices</h3>
            <p className="text-muted-foreground mb-6">
              Idiomatic Go patterns and code quality improvements.
            </p>

            <div className="space-y-8">
              <div className="glow-border rounded-lg p-6 bg-card/30">
                <h4 className="text-xl font-medium text-accent mb-2">no-defer-in-loop</h4>
                <p className="text-muted-foreground mb-4">
                  Deferring statements inside a loop can cause memory leaks because they are only executed when the function exits.
                </p>
                <FixableCodeBlock
                  badCode={`for _, file := range files {
    f, _ := os.Open(file)
    defer f.Close() // Stacks up until function returns
}`}
                  goodCode={`for _, file := range files {
    func() {
        f, _ := os.Open(file)
        defer f.Close()
        // ...
    }()
}`}
                />
              </div>

              <div className="glow-border rounded-lg p-6 bg-card/30">
                <h4 className="text-xl font-medium text-accent mb-2">context-first-param</h4>
                <p className="text-muted-foreground mb-4">
                  <code>context.Context</code> should always be the first parameter of a function.
                </p>
                <FixableCodeBlock
                  badCode={`func FetchData(id string, ctx context.Context) error { ... }`}
                  goodCode={`func FetchData(ctx context.Context, id string) error { ... }`}
                />
              </div>

              <div className="glow-border rounded-lg p-6 bg-card/30">
                <h4 className="text-xl font-medium text-accent mb-2">no-magic-numbers</h4>
                <p className="text-muted-foreground mb-4">
                  Avoid magic numbers; use named constants instead for better readability and maintainability.
                </p>
                <FixableCodeBlock
                  badCode={`time.Sleep(86400 * time.Second)`}
                  goodCode={`const SecondsInDay = 86400
time.Sleep(SecondsInDay * time.Second)`}
                />
              </div>

              <div className="glow-border rounded-lg p-6 bg-card/30">
                <h4 className="text-xl font-medium text-accent mb-2">use-slice-capacity</h4>
                <p className="text-muted-foreground mb-4">
                  Specify capacity when allocating slices with <code>make</code> if the length is known, to avoid reallocations.
                </p>
                <FixableCodeBlock
                  badCode={`data := make([]int, 0)
for i := 0; i < 100; i++ {
    data = append(data, i)
}`}
                  goodCode={`data := make([]int, 0, 100)
for i := 0; i < 100; i++ {
    data = append(data, i)
}`}
                />
              </div>

              <div className="glow-border rounded-lg p-6 bg-card/30">
                <h4 className="text-xl font-medium text-accent mb-2">always-prefer-const</h4>
                <p className="text-muted-foreground mb-4">
                  Prefer <code>const</code> over <code>var</code> for values that do not change.
                </p>
                <FixableCodeBlock
                  badCode={`var Pi = 3.14`}
                  goodCode={`const Pi = 3.14`}
                />
              </div>
            </div>
          </section>

          {/* Correctness */}
          <section>
            <h3 className="text-2xl font-semibold mb-6 text-foreground">Correctness</h3>
            <p className="text-muted-foreground mb-6">
              Detects potential bugs and incorrect code.
            </p>

            <div className="space-y-8">
              <div className="glow-border rounded-lg p-6 bg-card/30">
                <h4 className="text-xl font-medium text-accent mb-2">empty-block</h4>
                <p className="text-muted-foreground mb-4">
                  Detects empty code blocks which might indicate unfinished logic.
                </p>
                <FixableCodeBlock
                  badCode={`if user.IsActive {
    // missing logic
}`}
                  goodCode={`if user.IsActive {
    processUser(user)
}`}
                />
              </div>

              <div className="glow-border rounded-lg p-6 bg-card/30">
                <h4 className="text-xl font-medium text-accent mb-2">unused-receiver</h4>
                <p className="text-muted-foreground mb-4">
                  Detects method receivers that are not used inside the method body.
                </p>
                <FixableCodeBlock
                  badCode={`func (u *User) GetStaticID() int {
    return 42
}`}
                  goodCode={`func (u *User) GetStaticID() int {
    _ = u // explicit ignore or remove receiver name
    return 42
}`}
                />
              </div>
            </div>
          </section>

          {/* Complexity */}
          <section>
            <h3 className="text-2xl font-semibold mb-6 text-foreground">Complexity</h3>
            <p className="text-muted-foreground mb-6">
              Rules to keep code simple and maintainable.
            </p>

            <div className="space-y-8">
              <div className="glow-border rounded-lg p-6 bg-card/30">
                <h4 className="text-xl font-medium text-accent mb-2">max-func-lines</h4>
                <p className="text-muted-foreground mb-4">
                  Limits the number of lines in a function (default: 20).
                </p>
              </div>

              <div className="glow-border rounded-lg p-6 bg-card/30">
                <h4 className="text-xl font-medium text-accent mb-2">max-nesting-depth</h4>
                <p className="text-muted-foreground mb-4">
                  Limits the nesting depth of blocks (e.g. loops inside loops inside ifs).
                </p>
              </div>

              <div className="glow-border rounded-lg p-6 bg-card/30">
                <h4 className="text-xl font-medium text-accent mb-2">cyclomatic-complexity</h4>
                <p className="text-muted-foreground mb-4">
                  Limits the cyclomatic complexity of functions (number of execution paths).
                </p>
              </div>
            </div>
          </section>

          {/* Naming */}
          <section>
            <h3 className="text-2xl font-semibold mb-6 text-foreground">Naming</h3>
            <p className="text-muted-foreground mb-6">
              Enforces naming conventions.
            </p>

            <div className="space-y-8">
              <div className="glow-border rounded-lg p-6 bg-card/30">
                <h4 className="text-xl font-medium text-accent mb-2">receiver-names</h4>
                <p className="text-muted-foreground mb-4">
                  Receiver names should be short and consistent.
                </p>
                <FixableCodeBlock
                  badCode={`func (service *UserService) Get() { ... }`}
                  goodCode={`func (s *UserService) Get() { ... }`}
                />
              </div>
            </div>
          </section>

          {/* Style */}
          <section>
            <h3 className="text-2xl font-semibold mb-6 text-foreground">Style</h3>
            <p className="text-muted-foreground mb-6">
              Enforce consistent code style and formatting.
            </p>

            <div className="space-y-8">
              <div className="glow-border rounded-lg p-6 bg-card/30">
                <h4 className="text-xl font-medium text-accent mb-2">prefer-inc-dec</h4>
                <p className="text-muted-foreground mb-4">
                  Prefer <code>i++</code> and <code>i--</code> over <code>i += 1</code> and <code>i -= 1</code>.
                </p>
                <FixableCodeBlock
                  badCode={`i += 1`}
                  goodCode={`i++`}
                />
              </div>

              <div className="glow-border rounded-lg p-6 bg-card/30">
                <h4 className="text-xl font-medium text-accent mb-2">max-line-length</h4>
                <p className="text-muted-foreground mb-4">
                  Limits the maximum line length (default: 120).
                </p>
              </div>

              <div className="glow-border rounded-lg p-6 bg-card/30">
                <h4 className="text-xl font-medium text-accent mb-2">package-comments</h4>
                <p className="text-muted-foreground mb-4">
                  Requires package comments to be present and properly formatted.
                </p>
              </div>

              <div className="glow-border rounded-lg p-6 bg-card/30">
                <h4 className="text-xl font-medium text-accent mb-2">comment-spacing</h4>
                <p className="text-muted-foreground mb-4">
                  Ensures there is a space between <code>//</code> and the comment text.
                </p>
                <FixableCodeBlock
                  badCode={`//Todo: fix this`}
                  goodCode={`// Todo: fix this`}
                />
              </div>

              <div className="glow-border rounded-lg p-6 bg-card/30">
                <h4 className="text-xl font-medium text-accent mb-2">file-header</h4>
                <p className="text-muted-foreground mb-4">
                  Enforces a specific file header (e.g. copyright notice) at the top of the file.
                </p>
              </div>
            </div>
          </section>
        </div>
      </section>

      <section id="configuration" className="scroll-mt-20">
        <hr className="border-white/10 my-12" />
        <h2 className="text-2xl font-semibold mt-12 mb-4">Configuration</h2>
        <p className="text-muted-foreground mb-4">
          Serenity is highly configurable. You can use <code>JSON</code>, <code>YAML</code>, <code>YML</code>, or <code>TOML</code> for your configuration.
          Use the interactive generator below to create your <code>serenity</code> configuration file.
        </p>

        <ConfigGenerator />
      </section>

    </article>
  );
};

export default Introduction;
